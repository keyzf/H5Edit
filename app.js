var express = require('express'),
    path = require('path'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    lactate = require('lactate'),
    mongoose = require('mongoose');

var isDev = process.env.NODE_ENV !== 'production';
var app = express();
var port = 3000;
var pwd = __dirname;

global.userPath = './User';
global.dbHandel = require('./Server/db/dbHandel.js');
global.db = mongoose.connect("mongodb://localhost:27017/goh5");

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve('./server/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'who am i ?',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    saveUninitialized: true,
    resave: true
}));

// 用户上传的图片
app.use('/img', express.static(pwd + '/User/UploadImg/'));
// 用户上传的音乐
app.use('/audio', express.static(pwd + '/User/UploadMusic/'));

app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));

    require('./server/routers')(app);

    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);

    server.listen(port, function(){
        console.log('App (dev) is now running on port 3000!');
    });
} else {
    app.use(express.static(pwd + '/public/'));

    require('./Server/routers.js')(app);
    app.listen(port, function () {
        console.log('App (production) is now running on port 3000!');
    });
}
