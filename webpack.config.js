const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const path    = require("path")
const webpack = require("webpack")

module.exports = {
  mode,
  entry: {
    application: "./app/javascript/application.js",
    questions: "./app/javascript/questions.js",
    results: "./app/javascript/results.js",
    votes: "./app/javascript/votes.js"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFormat: "module",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
  }
}
