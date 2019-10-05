const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "./main.js"
    },
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
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};
