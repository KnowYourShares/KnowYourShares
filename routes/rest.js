var router = require('express').Router();

router.use('/', require('./company'));
router.use('/', require('./business'));

module.exports = router;
