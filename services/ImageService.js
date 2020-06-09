const readChunk = require('read-chunk');
const imageType = require('image-type');
const path = require('path');
const fs = require('fs');

module.exports = {

  changeImage: (newImage, oldImage) => {
    if (!newImage) {
      return oldImage;
    }
    const buffer = readChunk.sync(path.join(__dirname, `../public/images/${newImage.filename}`), 0, 12);
    if (!imageType(buffer).mime.includes('image')) {
      throw new Error('Invalid file type');
    }
    if (oldImage) {
      const absolutePath = path.join(__dirname, '../public/images/', oldImage);
      fs.unlink(absolutePath, (err) => {
        if (err) console.log(err.message);
      });
    }
    return newImage.filename;
  },

};
