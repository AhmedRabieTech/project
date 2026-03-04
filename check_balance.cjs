
const fs = require('fs');
try {
    const content = fs.readFileSync('src/pages/Home.jsx', 'utf8');
    let braceCount = 0;
    let parenCount = 0;
    let divCount = 0; // Rough count of <div vs </div

    const divOpen = (content.match(/<div/g) || []).length;
    const divClose = (content.match(/<\/div>/g) || []).length;

    console.log('Div Open Tags:', divOpen);
    console.log('Div Close Tags:', divClose);
    console.log('Diff:', divOpen - divClose);

    if (divOpen !== divClose) {
        console.log('MISMATCH!');
    } else {
        console.log('Balanced.');
    }

} catch (e) {
    console.error(e);
}
