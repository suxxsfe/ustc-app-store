const path = require("path");

module.exports = {
  
  entry: ["@babel/polyfill", "./client/src/index.js"],
  output: {
    path: path.resolve(__dirname, "client", "dist"),
    filename: "main.js",
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          "url-loader",
        ],
      },
    ],
  },
  
  mode:"development",
  
  devServer: {
    historyApiFallback: true,
    port: 5000,
    static: path.resolve(__dirname, "client", "dist"),
    open: true,
    proxy: {
      "/api": "http://localhost:3000",
      "/upload": "http://localhost:3000",
    }
  },
  
};

