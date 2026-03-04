
const fs = require('fs');

try {
    const data = fs.readFileSync('src/pages/Home.jsx', 'utf-8');
    // Handle CRLF or LF
    const lines = data.split(/\r?\n/);

    // 1-based: remove 254 to 511.
    // Index 253 to 510.
    // Keep 0..252.
    // Keep 511..end.

    const newLines = [
        ...lines.slice(0, 253),
        ...lines.slice(511)
    ];

    fs.writeFileSync('src/pages/Home.jsx', newLines.join('\n'), 'utf-8');
    console.log('Successfully deleted lines.');
} catch (e) {
    console.error(e);
}
