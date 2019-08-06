module.exports = () => {
    const path = require("path");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    return{
        entry:{
            bundle:"./src/index.js"
        },
        output:{
            filename:"[name].[chunkhash].js",
            path:path.resolve(`${__dirname}/../dist`),
            publicPath:""
        },
        mode:"production",
        optimization:{
            splitChunks:{
                chunks:"all",
                minSize: 10000,
                automaticNameDelimiter:"_"
            }
        },
        module:{
            rules:[
                {
                    test:/\.(jpe?g|png|gif|svg)$/,
                    use:[
                        {
                            loader: "url-loader",
                            options: {limit: 40000}
                        },
                        "image-webpack-loader"
                    ]
                },
                {
                    test:/\.css$/,
                    use:[
                        MiniCssExtractPlugin.loader,"css-loader"
                    ]
                },
                {
                    test:/\.scss$/,
                    use:[
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader:"postcss-loader",
                            options:{
                                plugins:function(){
                                    return[
                                        require("precss"),
                                        require("autoprefixer")
                                    ]
                                }
                            }
    
                        },
                        "sass-loader"
                    ]
                },
                {
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
            new MiniCssExtractPlugin({
                filename:"[name].[chunkhash].css"
            }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"index page",
            filename:"index.html",
            meta:{
                viewport:"width=device-width, initial-scale=1"
            },
            template:"src/index.html",
            description:'index'
        })
    ]
    }
}
