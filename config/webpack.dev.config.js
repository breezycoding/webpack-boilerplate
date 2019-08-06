module.exports = () => {
    const path = require("path");
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    return{
        entry:"./src/index.js",
        output:{
            filename:"bundle.js",
            path:path.resolve(`${__dirname}/../dist`),
            publicPath:""
        },
        mode:"development",
        devServer:{
            contentBase:path.resolve(`${__dirname}/../dist`),
            index: "index.html",
            port: 9000
        },
        module: {
            rules:[
                {
                    test:/\.(jpe?g|png|gif|svg)$/,
                    use:[
                        {
                            loader: "url-loader",
                            options: {
                                name:"[name].[ext]"
                            }
                        },
                        "image-webpack-loader"
                    ]
                },{
                    test:/\.css$/,
                    use:[
                        "style-loader","css-loader"
                    ]
                },{
                    test:/\.scss$/,
                    use:[
                        "style-loader","css-loader","sass-loader"
                    ]
                },{
                    test:/\.js$/,
                    exclude: /node_modules/,
                    use:{
                        loader:"babel-loader",
                        options: {
                            presets:[
                                "@babel/preset-env"
                            ],
                            plugins:[
                                "transform-class-properties"
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title:"index page",
                filename:"index.html",
                meta:{
                    viewport:"width=device-width, initial-scale=1"
                },
                template:"src/index.html",
                description:'index page'
            })
        ]
    }
}