import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INPUT_DIR = "public/img";
const OUTPUT_DIR = "src/assets/images";
const WIDTHS = [400, 800];

async function generateImages() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const files = await fs.readdir(INPUT_DIR);
  const images = files.filter((file) => /\.(jpe?g|png)$/i.test(file));

  if (images.length === 0) {
    console.log(`У папці ${INPUT_DIR} немає зображень (.jpg, .jpeg, .png).`);
    return;
  }

  for (const file of images) {
    const inputPath = path.join(INPUT_DIR, file);
    const { name } = path.parse(file);

    for (const width of WIDTHS) {
      const resized = sharp(inputPath).resize({
        width,
        withoutEnlargement: true,
      });

      await resized
        .clone()
        .avif({ quality: 65 })
        .toFile(path.join(OUTPUT_DIR, `${name}-${width}.avif`));

      await resized
        .clone()
        .webp({ quality: 80 })
        .toFile(path.join(OUTPUT_DIR, `${name}-${width}.webp`));

      await resized
        .clone()
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(OUTPUT_DIR, `${name}-${width}.jpg`));
    }

    console.log(`Готово: ${file} -> 400w та 800w (avif, webp, jpg)`);
  }
}

generateImages();
