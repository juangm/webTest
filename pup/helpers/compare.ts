import * as fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import bucket from "./bucket";

export const compare = {
  config: {
    pathDiff: "/app/helpers/img/diff.png",
    pathMaster: "/app/helpers/img/master/",
    pathCurrent: "/app/helpers/img/current/",
  },
  // same checks if two pngs are the same
  same: async (imgName, threshold = 0.1, maxPixDiff = 100) => {
    const img1 = PNG.sync.read(fs.readFileSync(compare.config.pathCurrent + imgName));
    const img2 = PNG.sync.read(fs.readFileSync(compare.config.pathMaster + imgName));
    const diff = new PNG({ width: img1.width, height: img2.height });
    const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: threshold });

    if (pixelDiff > maxPixDiff) {
      console.warn(`Pixel difference is ${pixelDiff} and maximum is ${maxPixDiff}`);
      fs.closeSync(fs.openSync(compare.config.pathDiff, "w"));
      const buffer = PNG.sync.write(diff);
      fs.writeFileSync(compare.config.pathDiff, buffer);
      console.warn(`Diff image was created at ${compare.config.pathDiff}`);
      // Upload file to bucket with unique identifier (enable when configured bucket in gcloud and env file)
      // const diffDate = new Date().toISOString();
      // await bucket.uploadFile(compare.config.pathDiff, `img/diff/diff${diffDate}`);
      return false;
    }
    return true;
  },
};
