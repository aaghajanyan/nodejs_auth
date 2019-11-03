const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
            posts: {
                title: "First Posts", 
                description:"First Post description"
            }
        });
});

module.exports = router;