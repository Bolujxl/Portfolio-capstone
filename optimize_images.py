import os
import glob
from PIL import Image

def optimize_image(img_path, output_path, max_width=1200):
    if not os.path.exists(img_path):
        print(f"File not found: {img_path}")
        return
    
    try:
        img = Image.open(img_path)
        # Calculate new height maintaining aspect ratio
        w, h = img.size
        if w > max_width:
            new_w = max_width
            new_h = int((max_width / w) * h)
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Save as webp with optimization
        img.save(output_path, "webp", quality=80, optimize=True)
        
        old_size = os.path.getsize(img_path) / 1024
        new_size = os.path.getsize(output_path) / 1024
        print(f"Optimized {os.path.basename(img_path)}: {old_size:.2f}KB -> {new_size:.2f}KB")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

# Use relative path so it works anywhere
base_dir = "imgs"

# Find all png and jpg files in the imgs folder
files_to_optimize = []
files_to_optimize.extend(glob.glob(os.path.join(base_dir, "*.png")))
files_to_optimize.extend(glob.glob(os.path.join(base_dir, "*.jpg")))

print(f"Found {len(files_to_optimize)} images to optimize.")

for in_path in files_to_optimize:
    # Skip if it's already a webp or a specialized small file like favicon
    if "myfavicon" in in_path or "logo" in in_path:
        continue
        
    out_path = os.path.splitext(in_path)[0] + ".webp"
    
    # Optional: skip if the optimized version already exists
    # if os.path.exists(out_path):
    #     continue
        
    optimize_image(in_path, out_path)
