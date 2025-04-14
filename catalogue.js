// Product data for the catalog
// catalogue.js

// New product array with gentlemen and royal-archive categories
window.products = [
    // Clothes - Native
    {
      id: 1,
      name: 'Yellow & Black Native Pattern',
      price: '$49.99',
      imageUrl: "images/zeon-empire-native4.webp",
      category: 'clothes',
      subcategory: 'native',
      description: 'Traditional native pattern with modern styling. Perfect for special occasions.'
    },
    {
      id: 2,
      name: 'Chevron Pattern Native Wear',
      price: '$99.99',
      imageUrl: 'images/zeon-empire-native3.jpg',
      category: 'clothes',
      subcategory: 'native',
      description: 'Bold chevron pattern in black and white. A statement piece for your wardrobe.'
    },
    {
      id: 3,
      name: 'Traditional Embroidered Attire',
      price: '$119.99',
      imageUrl: 'images/zeon-empire-native2.jpg',
      category: 'clothes',
      subcategory: 'native',
      description: 'Elegantly embroidered native wear with traditional designs. Perfect for ceremonies.'
    },
  
    // Clothes - Suits
    {
      id: 4,
      name: 'Classic Black Suit',
      price: '$199.99',
      imageUrl: 'images/zeon-emoire-suits1.webp',
      category: 'clothes',
      subcategory: 'suits',
      description: 'Timeless black suit tailored for a perfect fit. Essential for formal occasions.'
    },
    {
      id: 5,
      name: 'Navy Blue Slim Fit Suit',
      price: '$189.99',
      imageUrl: 'images/zeon-empire-suits4.jpg',
      category: 'clothes',
      subcategory: 'suits',
      description: 'Modern navy blue suit with slim fit design. Versatile for business and formal events.'
    },
    {
      id: 6,
      name: 'Gray Checked Suit',
      price: '$209.99',
      imageUrl: 'images/zeon-emoire-suits3.webp',
      category: 'clothes',
      subcategory: 'suits',
      description: 'Sophisticated gray suit with subtle check pattern. Perfect for making an impression.'
    },
  
    // Clothes - Shirts & Pants
    {
      id: 7,
      name: 'White Button-Up Shirt',
      price: '$49.99',
      imageUrl: 'images/zeon-empire-capsule0.jpg',
      category: 'clothes',
      subcategory: 'shirts-pants',
      description: 'Crisp white button-up shirt made from premium cotton. A wardrobe essential.'
    },
    {
      id: 8,
      name: 'Black Tailored Pants',
      price: '$79.99',
      imageUrl: 'images/zeon-empire-fits-logo.jpeg',
      category: 'clothes',
      subcategory: 'shirts-pants',
      description: 'Classic black tailored pants with a perfect fit. Versatile for any occasion.'
    },
    {
      id: 9,
      name: 'Striped Casual Shirt',
      price: '$59.99',
      imageUrl: 'images/zeon-empire-capsule.jpg',
      category: 'clothes',
      subcategory: 'shirts-pants',
      description: 'Stylish striped shirt for a casual yet put-together look. Made from breathable fabric.'
    },
  
    // Shoes - Derby
    {
      id: 10,
      name: 'Black & White Derby Shoes',
      price: '$149.99',
      imageUrl: 'images/zeon-empire-shoe-derby2.webp',
      category: 'shoes',
      subcategory: 'derby',
      description: 'Classic derby shoes with a modern black and white design. Perfect for formal occasions.'
    },
    {
      id: 11,
      name: 'Brown Leather Derby',
      price: '$139.99',
      imageUrl: 'images/zeon-empire-shoe-derby1.jpg',
      category: 'shoes',
      subcategory: 'derby',
      description: 'Handcrafted brown leather derby shoes. Timeless style with excellent craftsmanship.'
    },
    {
      id: 12,
      name: 'Black Formal Derby',
      price: '$159.99',
      imageUrl: 'images/zeon-empire-shoes-derby0.jpg',
      category: 'shoes',
      subcategory: 'derby',
      description: 'Elegant black derby shoes with subtle detailing. A must-have for your formal wardrobe.'
    },
  
    // Shoes - Loafers
   
    {
      id: 13,
      name: 'Brown Penny Loafers',
      price: '$119.99',
      imageUrl: 'images/zeon-empire-shoe-derby4.jpg',
      category: 'shoes',
      subcategory: 'loafers',
      description: 'Classic penny loafers in rich brown leather. Versatile for both casual and smart outfits.'
    },
    {
      id: 14,
      name: 'Black Tassel Loafers',
      price: '$139.99',
      imageUrl: 'images/zeon-empire-shoe-loafers.webp',
      category: 'shoes',
      subcategory: 'loafers',
      description: 'Elegant black tassel loafers made from premium leather. A sophisticated choice for any outfit.'
    },
    {
        id: 15,
        name: "Velvet Smoking Jacket",
        price: '299.99',
        description: "Luxurious jacket for refined evenings.",
        imageUrl: "images/zeon-empire-gentlemen3.webp",
        category: "gentlemen"
      },
      {
        id: 16,
        name: "Gold Pocket Watch",
        price: '499.99',
        description: "Timeless heirloom with intricate engraving.",
        imageUrl: "images/zeon-empire-royal1.webp",
        category: "royal-archive"
      },
      {
        id: 17,
        name: "Tailored Dress Shirt",
        price: '89.99',
        description: "Crisp shirt for the modern gentleman.",
        imageUrl: "images/zeon-empire-gentleman1.jpg",
        category: "gentlemen"
      },
      {
        id: 18,
        name: "Antique Cufflinks",
        price: '199.99',
        description: "Vintage cufflinks from a royal collection.",
        imageUrl: "images/zeon-empire-royal0.webp",
        category: "royal-archive"
      },
      {
        id: 19,
        name: "Tailored Dress Shirt",
        price: '89.99',
        description: "Crisp shirt for the modern gentleman.",
        imageUrl: "images/zeon-empire-gentlemen4.webp",
        category: "gentlemen"
      },
      {
        id: 20,
        name: "Tailored Dress Shirt",
        price: '89.99',
        description: "Crisp shirt for the modern gentleman.",
        imageUrl: "images/zeon-empire-gentlemen5.webp",
        category: "gentlemen"
      },
      {
        id: 21,
        name: "Tailored Dress Shirt",
        price: '89.99',
        description: "Crisp shirt for the modern gentleman.",
        imageUrl: "images/zeon-empire-gentlemen6.webp",
        category: "gentlemen"
      },
      {
        id: 22,
        name: "Tailored Dress Shirt",
        price: '89.99',
        description: "Crisp shirt for the modern gentleman.",
        imageUrl: "images/zeon-empire-fit-mix1.webp",
        category: "royal-archive"
      },
      {
        id: 23,
        name: "Tailored Dress Shirt",
        price: '89.99',
        description: "Crisp shirt for the modern gentleman.",
        imageUrl: "images/zeon-empire-fits-mix0.jpeg",
        category: "royal-archive"
      },
      
];

// Export the products array so it can be imported in other scripts
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { products }; // For Node.js/CommonJS environments
} else {
  window.products = products; // For browser environments
}
window.products = products;
