const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

makeM3u8 = (filePath, outputPath) => {
  ffmpeg(filePath)
  .videoCodec("libx264")
//  .audioCodec("libfaac")
  .format("hls")
  .outputOptions("-hls_list_size 0")
  .outputOption("-hls_time 2")
  .output(outputPath)
  .on("progress", (progress) => {
    console.log("Processing: "+progress.percent+"% done");
  })
  .on("end", () => {
    console.log("m3u8 made successfully");
  })
  .run();
}

module.exports = makeM3u8;

