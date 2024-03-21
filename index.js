import path from "path";
import fs from "fs";
import url from "url";
import AdmZip from "adm-zip"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const fnmDir = path.join(__dirname, "fnm");
await fs.promises.rm(fnmDir, { recursive: true, force: true });
await fs.promises.mkdir(fnmDir, { recursive: true });

console.log("Downloading...");
const u = `https://github.com/Schniz/fnm/releases/latest/download/fnm-linux.zip`;
const response = await fetch(u);
const buffer = await response.arrayBuffer();


console.log("Extracting...");
const zip = new AdmZip(Buffer.from(buffer));

await new Promise((resolve, reject) => {
    zip.extractAllToAsync(fnmDir, undefined, undefined, (error) => {
        if (error) {
            console.log("Error!", error)
            reject(error);
        } else {
            console.log("Extracted!")
            resolve();
        }
    });
});

console.log("Done!");
