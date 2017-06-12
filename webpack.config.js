
const webpack = require('webpack');

module.exports = {
    entry: './src/client.js',
    output: {
        filename: './public/bundle.js'
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}