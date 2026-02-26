const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
const SIZES = [400, 800, 1200];

async function optimizeImages() {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        if (file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.jpg')) {
            for (const size of SIZES) {
                const basename = path.basename(file, path.extname(file));
                const newFilename = `${basename}-${size}w.webp`;
                const outputPath = path.join(directoryPath, newFilename);

                console.log(`Optimizing ${file} to ${newFilename}...`);

                try {
                    await sharp(path.join(directoryPath, file))
                        .resize(size)
                        .webp({ quality: 80 })
                        .toFile(outputPath);
                    console.log(`Success: ${newFilename}`);
                } catch (error) {
                    console.error(`Error processing ${file}:`, error);
                }
            }
        }
    }
}

optimizeImages();
