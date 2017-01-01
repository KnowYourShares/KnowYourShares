'use strict';

var router = require('express').Router();

var cruder = require('../../implementation/companyImpl');

router.route('/rest/business')
    .post(function(req, res) {
        return cruder.creater(req, res);
    });


router.route('/rest/business/:id/:password')
    .get(function(req,res) {
        return cruder.geter(req, res);
    })
    .put(function(req, res) {
        return cruder.modifier(req, res);
    })
    .delete(function(req, res) {
        return cruder.deleter(req, res);
    });

router.route('/rest/business/:id')
    .get(function(req,res) {
        return cruder.geter(req, res);
    })
    .put(function(req, res) {
        return cruder.modifier(req, res);
    })
    .delete(function(req, res) {
        return cruder.deleter(req, res);
    });

module.exports = router;
