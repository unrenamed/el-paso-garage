const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html",
    favicon: "./assets/images/favicon.ico"
});

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "bundle.js"
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
        progress: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
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
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ["file-loader"]
            }
        ]
    }
};
