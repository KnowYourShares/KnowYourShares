var Company = require('./../../schemas/companySchema');
var Action = require('./../../schemas/actionSchema');
var Contributor = require('./../../schemas/contributorSchema');
<<<<<<< HEAD
var Deferred = require("promised-io/promise").Deferred;
var Promise = require("promised-io/promise");

function _getCompany(req, res) {
    var companyId = req.params.companyId;
    Company.findById(companyId)
        .populate('contributors')
        .populate('actions')
        .exec(function (error, found) {
            if(found) {
                return res.json({status: 200, message: found});
            } else {
                return res.json({status: 400, message: 'company not found'});
            }
        })
}

function _postCompany(req, res) {
    var campanya = new Company();
    campanya.value = req.body.value;
    campanya.premoney = req.body.premoney;
    campanya.postmoney = req.body.postmoney;
    _saveActions(req.body.actions).then(function (actions) {
        campanya.actions = actions;
        _saveContributors(req.body.contributors).then(function (contributors) {
            campanya.contributors = contributors;
            campanya.save(function (err, comp) {
                return res.json({status: 200, message: comp._id});
            });
        });
    });
}

function _saveContributors(contributors) {
    var deferredSave = new Deferred();
    var contributorsPromises = [];
    contributors.forEach(function (item) {
        var deferred = new Deferred();
        var contributor = new Contributor();
        contributor.type = item.type;
        contributor.name = item.name;
        contributor.shares = item.shares;
        contributor.save(function (error, contributor) {
            if (error) {
                deferred.reject();
            } else {
                deferred.resolve(contributor)
            }
        });
        contributorsPromises.push(deferred);
    });
    Promise.all(contributorsPromises).then(function (contributors) {
        deferredSave.resolve(contributors)
    }, function () {
        deferredSave.reject({status: 400, message: 'ERROR ON ACTIONS'});
    });
    return deferredSave.promise;
}

function _saveActions(actions) {
    var deferredSave = new Deferred();
    var actionsPromises = [];
    actions.forEach(function (item) {
        var deferred = new Deferred();
        var action = new Action();
        action.type = item.type;
        action.moneyraised = item.moneyraised;
        action.optionpool = item.optionpool;
        action.save(function (error, action) {
            if (error) {
                deferred.reject();
            } else {
                deferred.resolve(action);
            }
        });
        actionsPromises.push(deferred);
    });
    Promise.all(actionsPromises).then(function (actions) {
        deferredSave.resolve(actions)
    }, function () {
        deferredSave.reject({status: 400, message: 'ERROR ON ACTIONS'});
    });
    return deferredSave.promise;
}

module.exports = {
    getCompany: _getCompany,
    postCompany: _postCompany
};
