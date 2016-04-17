const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlagin = require('extract-text-webpack-plugin');
const stylus = require('stylus');
const poststylus = require('poststylus');


module.exports = {
    context: path.join(__dirname, 'bundles'),
    entry: {
        'layout': './layout.js'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlagin.extract('css-loader!stylus-loader')
            }
        ]
    },
    stylus: {
        use: [
            poststylus(['autoprefixer'])
        ]
    },
    plugins: [
        new ExtractTextPlagin("[name].css")
    ]
};