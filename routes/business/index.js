'use strict';

var router = require('express').Router();

var cruder = require('../../cruder')('./schemas/businessSchema');

router.route('/rest/business')
    .post(cruder.creater);

router.route('/rest/business/:id')
    .get(cruder.geter)
    .put(cruder.modifier)
    .delete(cruder.deleter);

module.exports = router;
