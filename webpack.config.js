const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
    mode: 'development',
    target: 'web',
    externals: {
        jquery: 'jQuery',
        moment: 'moment',
        "chart.js": 'Chart',
        clipboard: 'ClipboardJS',
        //select2: 'select2'
    },
    entry: {
        popup: "./src/scripts/popup.js",
        popupCss: "./src/styles/popup.scss",
    },
    output: {
        path: path.resolve(__dirname, "dist/scripts/js"),
        filename: '[name].min.js',
        publicPath: "dist/scripts/js"
    },
    module:{
        rules:[
            { 
                test: /\.(woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000&name=../fonts/[name].[ext]' 
            },
            { 
                test: /\.(jpg|jpeg|png|gif)$/, 
                loader: 'url-loader?limit=100000&name=../images/[name].[ext]'
            },
            {
                test:/\.(s*)css$/,
                use:[
                    {
						loader: 'file-loader',
						options: {
							name: '../css/[name].css',
						}
                    },
                    {
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
                ]
            }
            
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    mangle: true,
                    output: {comments: false}
                },
                sourceMap: true // set to true if you want JS source maps
            }),
            //new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin()
    ],
}