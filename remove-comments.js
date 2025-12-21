import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeComments(content, fileExt) {
    let result = content;

    if (fileExt === '.vue' || fileExt === '.ts' || fileExt === '.js') {
        result = result.replace(/<!--[\s\S]*?-->/g, '');
        result = result.replace(/\/\*[\s\S]*?\*\//g, '');
        result = result.replace(/\/\/.*$/gm, '');
    }

    result = result.replace(/\n\s*\n\s*\n/g, '\n\n');

    return result;
}

function processFile(filePath) {
    try {
        const ext = path.extname(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        const cleaned = removeComments(content, ext);

        if (cleaned !== content) {
            fs.writeFileSync(filePath, cleaned, 'utf8');
            console.log(`Cleaned: ${path.basename(filePath)}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

function walkDirectory(dir, exclude = ['node_modules', '.nuxt', 'dist', '.output', '.git']) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!exclude.includes(file)) {
                walkDirectory(filePath, exclude);
            }
        } else if (stat.isFile()) {
            const ext = path.extname(file);
            if (['.vue', '.ts', '.js'].includes(ext) && file !== 'remove-comments.js') {
                processFile(filePath);
            }
        }
    });
}

console.log('Starting comment removal...');
walkDirectory(__dirname);
console.log('Comment removal complete!');
