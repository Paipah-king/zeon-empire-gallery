from PIL import Image
import os

def convert_images(input_folder, output_folder):
    # Create the output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Loop through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.lower().endswith((".jpg", ".jpeg")):
            try:
                # Open the image
                with Image.open(os.path.join(input_folder, filename)) as img:
                    # Convert to PNG
                    png_filename = os.path.splitext(filename)[0] + ".png"
                    img.save(os.path.join(output_folder, png_filename), "PNG")
                    print(f"Converted {filename} to {png_filename}")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

    print("Conversion complete!")

# Specify the folder containing your JPG files
input_folder = r"c:\Users\MAC\Desktop\RedBull Email Page\images"
# Specify the folder where you want to save the converted PNG files
output_folder = r"c:\Users\MAC\Desktop\RedBull Email Page\output_images"

convert_images(input_folder, output_folder)