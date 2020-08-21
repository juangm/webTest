import * as fs from 'fs';
import * as Storage from '@google-cloud/storage';

const connectToBucket = async () => {
  const storage = new Storage.Storage(bucket.configStorage);
  return storage.bucket(process.env.SCREENSHOTS_BUCKET_NAME);
};

export const bucket = {
  configStorage: {
    projectId: process.env.SCREENSHOTS_PROJECT_NAME,
    keyFilename: process.env.SCREENSHOTS_STORAGE_CREDENTIALS,
  },

  uploadFile: async (filePath, destinationPath) => {
    const bucket = await connectToBucket();
    // Full list of options: https://googleapis.dev/nodejs/storage/latest/global.html#UploadOptions
    const optionsUpload = {
      destination: destinationPath,
      validation: 'crc32c',
    };
    try {
      await bucket.upload(filePath, optionsUpload);
      console.log(`File ${filePath} was upload successfully!`);
    } catch (err) {
      console.error(`Problem uploading file: ${filePath}`);
      throw err;
    }
  },

  uploadDirectory: async (srcPath, destPath) => {
    try {
      const listFiles = fs.readdirSync(srcPath);
      for (let file of listFiles) {
        console.log(`Uploading file ${file}`);
        await bucket.uploadFile(`${srcPath}/${file}`, `${destPath}/${file}`);
      }
    } catch (err) {
      console.log(`Error uploading files in bucket`);
      throw err;
    }
  },

  downloadFile: async (destFilename, srcFilename) => {
    const bucket = await connectToBucket();
    // Downloads the file
    await bucket.file(srcFilename).download({ destination: destFilename });
    console.log(`File ${srcFilename} downloaded to ${destFilename} successfully!`);
  },

  downloadDirectory: async (srcPath, destPath) => {
    const bucket = await connectToBucket();
    try {
      const [listFiles] = await bucket.getFiles({ directory: srcPath });
      for (let file of listFiles) {
        const fileName = file.name.split('/').pop();
        console.log(`Downloading file ${fileName}`);
        await file.download({ destination: `${destPath}/${fileName}` });
      }
    } catch (err) {
      console.log(`Error downloading all files in path ${srcPath}`);
      throw err;
    }
  },

  deleteFiles: async (subPath) => {
    const bucket = await connectToBucket();
    try {
      const [listFiles] = await bucket.getFiles({ directory: subPath });
      for (let file of listFiles) {
        console.log(`Deleting file ${file.name}`);
        await file.delete();
      }
    } catch (err) {
      console.log(`Error deleting all files in bucket`);
      throw err;
    }
  },
};

export default bucket;
