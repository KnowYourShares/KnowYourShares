var router = require('express').Router();
var companyImpl = require('./../../implementation');

router.route('/rest/company/:companyId')
    .get(function (req, res) {
        return companyImpl.getCompany(req, res);
    });

router.route('/rest/company')
    .post(function (req, res) {
        return companyImpl.postCompany(req, res);
    });

module.exports = router;