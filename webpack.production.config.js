var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var productionConfig = [{
    entry: {
        back: './client/back/main.js',
        front: './client/front/main.js'
    },
    output: {
        filename: './[name]/bundle.js',
        path: path.resolve('./public'),
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css!resolve-url')
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }, {
            test: require.resolve('jquery'),
            loader: 'expose?$'
        }]
    },
    plugins: [
        new ExtractTextPlugin('./[name]/index.css', {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    resolve: {
        alias: {
            'jQuery': path.join(__dirname, 'node_modules/jquery/dist/jquery')
        }
    }
}];

module.exports = productionConfig;