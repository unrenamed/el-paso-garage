const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html",
    favicon: "./assets/images/favicon.ico"
});

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    mode: "development",
    output: {
        filename: "bundle.js",
        publicPath: '/'
    },
    plugins: [
        htmlPlugin
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000,
        proxy: {
          '/api':  {
              target: 'http://localhost:8000',
              changeOrigin: true
          }
        },
        watchContentBase: true,
        progress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                use: ["file-loader"]
            }
        ]
    }
};
