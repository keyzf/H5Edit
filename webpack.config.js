var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    entry: {
        back: ['./Client/back/main.js', hotMiddlewareScript],
        front: ['./Client/front/main.js', hotMiddlewareScript]
    },
    output: {
        filename: './[name]/bundle.js',
        path: path.resolve('./public'),
        publicPath: publicPath
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?context=client&name=[path][name].[ext]'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }, {
            test: require.resolve('jquery'),
            loader: 'expose?$'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
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
};

module.exports = devConfig;