module.exports = function(app) {
	var routers = require('./apis/index.js');
	// 后台页面
	app.get('/', function(req, res, next) {
		if (!req.session.isLogin) {
			res.clearCookie('isLogin');
			res.clearCookie('user_name');
		}
		res.render('back');
	});

	// 前台页面
	app.get('/show/:id', function(req, res, next) {
		var id = req.params.id;
		var Work = global.dbHandel.getModel('work');
		Work.find({ '_id': id }).exec(function(err, docs) {
			res.render('front', {
				workData: docs[0]
			});
		});
	});

	routers.forEach(function(Router) {
		app.use('/api', Router);
	});
};