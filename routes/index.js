var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('app', { layout: 'applayout' });
});

router.get('/admin', ensureAuthenticated, function(req, res) {
	res.render('admin', { layout: 'adminarea' });	
});

router.get('/sandbox', function(req, res) {
	res.render('sandbox', { layout: 'sandbox' });	
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;