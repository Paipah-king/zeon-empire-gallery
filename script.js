document.addEventListener('DOMContentLoaded', function () {
  try {
    const stored = JSON.parse(localStorage.getItem('selectedProducts'));
    window.selectedProducts = Array.isArray(stored) ? stored : [];
  } catch {
    window.selectedProducts = [];
    localStorage.removeItem('selectedProducts');
  }

  const path = window.location.pathname;
  if (path.includes('clothes')) window.currentCategory = 'clothes';
  else if (path.includes('shoes')) window.currentCategory = 'shoes';
  else if (path.includes('gentlemen')) window.currentCategory = 'gentlemen';
  else if (path.includes('royal-archive')) window.currentCategory = 'royal-archive';
  else window.currentCategory = 'all';

  window.currentSubcategory = 'all';

  if (document.getElementById('products-grid')) {
    window.renderSubcategoryFilters();
    window.filterAndDisplayProducts();
  }

  window.updateCartCount();

  if (path.includes('cart.html')) {
    window.renderCartItems();

    const clearBtn = document.getElementById('clear-cart');
    const proceedBtn = document.getElementById('proceed-to-order');
    const modal = document.getElementById('order-modal');
    const overlay = document.getElementById('overlay');
    const closeModal = document.querySelector('.close-order-modal');

    clearBtn?.addEventListener('click', () => {
      window.selectedProducts = [];
      localStorage.removeItem('selectedProducts');
      window.renderCartItems();
      window.updateCartCount();
    });

    proceedBtn?.addEventListener('click', () => {
      if (!window.selectedProducts.length) return alert('Cart is empty');
      modal?.classList.add('show');
      overlay?.classList.add('active');
    });

    closeModal?.addEventListener('click', () => {
      modal?.classList.remove('show');
      overlay?.classList.remove('active');
    });

    overlay?.addEventListener('click', () => {
      modal?.classList.remove('show');
      overlay?.classList.remove('active');
    });

    document.getElementById('whatsapp-order')?.addEventListener('click', () => {
      const message = createOrderMessage();
      window.open(`https://wa.me/+1234567890?text=${encodeURIComponent(message)}`, '_blank');
    });

    document.getElementById('instagram-order')?.addEventListener('click', () => {
      const message = createOrderMessage();
      copyToClipboard(message);
      alert("Your order message has been copied! Paste it in Instagram DMs.");
      // alert(`Copy this and send via Instagram:\n\n${message}`);
      window.open(`https://www.instagram.com/direct/t/17844425490149328`, '_blank');
    });
  }
});

function formatSubcategory(sub) {
  if (!sub) return '';
  return sub.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function createOrderMessage() {
  const total = window.calculateTotalPrice();
  return `Order Summary:\n\n${window.selectedProducts.map(p =>
    `• ${p.name} (${p.size || "No size"}) x${p.quantity || 1}\n  Notes: ${p.notes || 'None'}\n  Price: ${p.price}`
  ).join('\n\n')}\n\nTotal: $${total}`;
}
function copyToClipboard(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

window.renderSubcategoryFilters = function () {
  const container = document.querySelector('.subcategory-filter');
  if (!container || !window.products) return;

  const categories = window.products
    .filter(p => p.category === window.currentCategory)
    .map(p => p.subcategory);

  const uniqueSubcategories = ['all', ...new Set(categories)];

  container.innerHTML = uniqueSubcategories.map(sub => {
    const label = sub === 'all' ? 'All' : formatSubcategory(sub);
    return `<button class="subcategory-btn${sub === 'all' ? ' active' : ''}" data-sub="${sub}">${label}</button>`;
  }).join('');

  container.querySelectorAll('.subcategory-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.currentSubcategory = btn.dataset.sub;
      document.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.filterAndDisplayProducts();
    });
  });
};

window.filterAndDisplayProducts = function () {
  const grid = document.getElementById('products-grid');
  if (!grid || !window.products) return;

  let filtered = window.products;

  if (window.currentCategory && window.currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === window.currentCategory);
  }

  if (window.currentSubcategory && window.currentSubcategory !== 'all') {
    filtered = filtered.filter(p => p.subcategory === window.currentSubcategory);
  }

  const search = document.getElementById('search-input')?.value?.toLowerCase() || '';
  const minPrice = parseFloat(document.getElementById('min-price')?.value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price')?.value) || Infinity;
  const brand = document.getElementById('brand-filter')?.value;

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  filtered = filtered.filter(p => {
    const price = parseFloat(p.price.replace('$', '')) || 0;
    return price >= minPrice && price <= maxPrice;
  });

  if (brand) {
    filtered = filtered.filter(p => (p.description || '').includes(brand));
  }

  grid.innerHTML = '';
  if (filtered.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-cart-message';
    emptyMessage.textContent = 'No products found.';
    grid.appendChild(emptyMessage);
    return;
  }

  filtered.forEach(product => {
    const card = window.createProductCard(product);
    card.classList.add('fade-in'); // for animation
    grid.appendChild(card);
  });
};

window.createProductCard = function (product) {
  const selected = window.selectedProducts.find(p => p.id === product.id);
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-image"><img src="${product.imageUrl}" alt="${product.name}"></div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">${product.price}</p>
      <p class="product-subcategory">${formatSubcategory(product.subcategory)}</p>
    </div>
    ${selected ? '<div class="product-selected">✓</div>' : ''}
    <button class="add-to-cart-btn" data-id="${product.id}">+</button>
  `;
  card.querySelector('.add-to-cart-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    toggleProductSelection(product);
    filterAndDisplayProducts(); // To reflect change immediately
  });
  return card;
};

function toggleProductSelection(product) {
  const i = window.selectedProducts.findIndex(p => p.id === product.id);
  if (i === -1) {
    window.selectedProducts.push({ ...product, quantity: 1, size: 'M', notes: '' });
  } else {
    window.selectedProducts.splice(i, 1);
  }
  syncCart(false);
}

function syncCart(refresh = true) {
  localStorage.setItem('selectedProducts', JSON.stringify(window.selectedProducts));
  if (refresh) window.renderCartItems?.();
  window.updateCartCount();
}

window.updateCartCount = function () {
  const count = document.getElementById('cart-count');
  if (count) count.textContent = window.selectedProducts.length;
};

window.calculateTotalPrice = function () {
  return window.selectedProducts.reduce((sum, p) => {
    const price = parseFloat(p.price.replace('$', ''));
    return sum + ((p.quantity || 1) * (isNaN(price) ? 0 : price));
  }, 0).toFixed(2);
};

window.renderCartItems = function () {
  const container = document.getElementById('cart-items');
  const totalElem = document.getElementById('cart-total');
  if (!container) return;

  container.innerHTML = '';

  if (!window.selectedProducts.length) {
    container.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p><a href="index.html" class="btn primary">Continue Shopping</a>';
    totalElem.textContent = '0.00';
    return;
  }

  let total = 0;

  window.selectedProducts.forEach((p, index) => {
    const price = parseFloat(p.price.replace('$', '')) * (p.quantity || 1);
    total += price;

    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <div class="cart-item-image"><img src="${p.imageUrl}" alt="${p.name}"></div>
      <div class="cart-item-details">
        <h4 class="cart-item-name">${p.name}</h4>
        <p class="cart-item-price">$${(price).toFixed(2)}</p>
        <label>Size:
          <select data-index="${index}" class="size-select">
            <option ${p.size === 'S' ? 'selected' : ''}>S</option>
            <option ${p.size === 'M' ? 'selected' : ''}>M</option>
            <option ${p.size === 'L' ? 'selected' : ''}>L</option>
          </select>
        </label>
        <label>Notes:
          <input type="text" class="note-input" data-index="${index}" value="${p.notes || ''}" placeholder="e.g., Gift wrap it">
        </label>
        <div class="quantity-controls">
          <button class="qty-btn" data-index="${index}" data-action="decrease">−</button>
          <span class="quantity">${p.quantity || 1}</span>
          <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
        </div>
        <button class="remove-item-btn" data-index="${index}">Remove</button>
      </div>
    `;
    container.appendChild(item);
  });

  totalElem.textContent = parseFloat(total).toFixed(2);
  totalElem.classList.add('price-flash');
  setTimeout(() => totalElem.classList.remove('price-flash'), 500);

  container.querySelectorAll('.remove-item-btn').forEach(btn =>
    btn.addEventListener('click', e => {
      const i = e.target.dataset.index;
      window.selectedProducts.splice(i, 1);
      syncCart();
    })
  );

  container.querySelectorAll('.qty-btn').forEach(btn =>
    btn.addEventListener('click', e => {
      const i = parseInt(e.target.dataset.index);
      const action = e.target.dataset.action;
      const p = window.selectedProducts[i];
      p.quantity = Math.max(1, (p.quantity || 1) + (action === 'increase' ? 1 : -1));
      syncCart();
    })
  );

  container.querySelectorAll('.size-select').forEach(sel =>
    sel.addEventListener('change', e => {
      const i = e.target.dataset.index;
      window.selectedProducts[i].size = e.target.value;
      syncCart(false);
    })
  );

  container.querySelectorAll('.note-input').forEach(input =>
    input.addEventListener('input', e => {
      const i = e.target.dataset.index;
      window.selectedProducts[i].notes = e.target.value;
      syncCart(false);
    })
  );
};

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};

// === 🔄 SCROLL TO TOP BUTTON ===
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 300);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === 🌙 DARK MODE TOGGLE ===
const toggle = document.getElementById('dark-mode-toggle');

if (toggle) {
// Set icon and theme on initial load
window.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('dark-mode') === 'enabled';
  document.documentElement.classList.toggle('dark-mode', isDark);
  toggle.textContent = isDark ? '☀️' : '🌙';
});

// Toggle dark mode and update localStorage
toggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark-mode');
  toggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
});
}


// === 🔍 SIDEBAR FILTERS (Search, Price, Brand) ===
// function renderSidebarFilters() {
//   const sidebar = document.getElementById('sidebar-filters');
//   if (!sidebar || !window.products) return;

//   const brands = [...new Set(window.products.map(p => (p.description || '').split(' ')[0]))];

//   sidebar.innerHTML = `
//     <input type="text" id="search-input" placeholder="Search products..." />
//     <input type="number" id="min-price" placeholder="Min Price" />
//     <input type="number" id="max-price" placeholder="Max Price" />
//     <select id="brand-filter">
//       <option value="">All Brands</option>
//       ${brands.map(brand => `<option value="${brand}">${brand}</option>`).join('')}
//     </select>
//     <button id="apply-filters">Apply Filters</button>
//   `;

//   document.getElementById('apply-filters')?.addEventListener('click', () => {
//     window.filterAndDisplayProducts?.();
//   });

//   document.getElementById('search-input')?.addEventListener('input', () => {
//     window.filterAndDisplayProducts?.();
//   });
// }

// Auto-render sidebar filters on product pages
// if (document.getElementById('sidebar-filters')) {
//   renderSidebarFilters();
// }

// === 🧠 EXTEND filterAndDisplayProducts TO SUPPORT SEARCH/FILTER ===
const originalFilter = window.filterAndDisplayProducts;
window.filterAndDisplayProducts = function () {
  if (!window.products) return;

  let filtered = window.products;

  if (window.currentCategory && window.currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === window.currentCategory);
  }

  if (window.currentSubcategory && window.currentSubcategory !== 'all') {
    filtered = filtered.filter(p => p.subcategory === window.currentSubcategory);
  }

  const search = document.getElementById('search-input')?.value?.toLowerCase() || '';
  const minPrice = parseFloat(document.getElementById('min-price')?.value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price')?.value) || Infinity;
  const brand = document.getElementById('brand-filter')?.value;

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  filtered = filtered.filter(p => {
    const price = parseFloat(p.price.replace('$', '')) || 0;
    return price >= minPrice && price <= maxPrice;
  });

  if (brand) {
    filtered = filtered.filter(p => (p.description || '').includes(brand));
  }

  // Call your original logic to render cards
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = '';
  if (filtered.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-cart-message';
    emptyMessage.textContent = 'No products found.';
    grid.appendChild(emptyMessage);
    return;
  }

  filtered.forEach(product => {
    const card = window.createProductCard(product);
    card.classList.add('fade-in'); // for animation
    grid.appendChild(card);
  });
};
