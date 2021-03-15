const express = require('express');
const router = express.Router();

router.get('/einstein-and-churchill-both-took-daily-naps', (req, res) => {
	res.render("home", {
		meta: req.app.get('meta'),
        article: req.app.get('article'),
        articleDate: req.app.get('articleDate'),
        posts: req.app.get('posts')
	});
});

module.exports = router;
