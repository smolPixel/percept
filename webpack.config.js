
const webpack = require('webpack');

module.exports = {
    entry: './src/client.js',
    output: {
        filename: './public/bundle.js'
    },
    module:{
        loaders:[
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devtool: 'source-map'
}