const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	req.session.login = false;
	req.session.userID = null;

	req.session.destroy((err) => {
		if(err) {
			console.log(err);
		} else {
			res.clearCookie('connect.sid', {
				httpOnly: true
			});
			console.log('cookie cleared');
			res.redirect('/');
		}
	})
});

module.exports = router;