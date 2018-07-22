var path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-maps",
  entry: path.join(__dirname, 'src/app.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs)$/,
        use: {
          loader: 'ts-shader-loader'
        }
      },
      {
        test: /\.ts$/,
        exclude: [/(node_modules)/, /\.glsl$/],
        use: {
          loader: 'ts-loader',
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".glsl"]
  },
};