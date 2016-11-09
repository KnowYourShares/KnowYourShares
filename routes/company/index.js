var router = require('express').Router();

router.route('/company')
    .get(function (req, res) {
        res.json({status: 200, message: 'GET COMPANY'});
    })

    .post(function (req, res) {
        res.json({status: 200, message: 'POST COMPANY'});
    });

module.exports = router;