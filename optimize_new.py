import os
from PIL import Image

src = r"C:\Users\Boluwatife Jakobe\.gemini\antigravity\brain\364aca20-8fb2-490b-9645-3203e7238207\timelocked_raw_1785387043636.png"
dst = r"c:\Users\Boluwatife Jakobe\OneDrive\Desktop\HTML SITES\Portfolio capstone\imgs\timelocked.webp"

if os.path.exists(src):
    img = Image.open(src)
    w, h = img.size
    max_width = 1200
    if w > max_width:
        new_w = max_width
        new_h = int((max_width / w) * h)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    img.save(dst, "webp", quality=80, optimize=True)
    print("Optimization complete: saved to", dst)
else:
    print("Source file not found")
