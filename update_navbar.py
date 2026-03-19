import re

file_path = "src/components/Navbar.jsx"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure we import Navbar.css
if "import './Navbar.css';" not in content:
    # Insert at the top after other imports
    content = content.replace("import React", "import React\nimport './Navbar.css';\n", 1)

# we want to delete everything between <style dangerouslySetInnerHTML={{ and `}} />
# The robust regular expression should match `<style dangerouslySetInnerHTML={{` down to `}} />`
pattern = r'<style dangerouslySetInnerHTML={{.*?}} />'
new_content = re.sub(pattern, '', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Navbar updated successfully!")
