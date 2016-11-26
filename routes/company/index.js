var router = require('express').Router();
var companyImpl = require('./../../implementation');

router.route('/rest/company')
    .get(function (req, res) {
        return companyImpl.getCompany(req, res);
    })

    .post(function (req, res) {
        return companyImpl.postCompany(req, res);
    });

module.exports = router;