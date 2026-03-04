
import os

try:
    with open("src/pages/Home.jsx", "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    # 1-based lines to delete: 254 to 511 inclusive.
    # 0-based indices: 253 to 510.
    # Keep 0..252. Skip 253..510. Keep 511..end.
    
    new_lines = lines[:253] + lines[511:]
    
    with open("src/pages/Home.jsx", "w", encoding="utf-8") as f:
        f.writelines(new_lines)
        
    print("Successfully deleted lines.")
    
except Exception as e:
    print(f"Error: {e}")
