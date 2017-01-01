'use strict';
var model = require('../../schemas/businessSchema');

/**
 * Deletes a model
 */
function _deleter(req, res) {
    model.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(204).send('No Content');
        }
    });
}

/**
 * Modifies a model
 */
function _modifier(req, res) {
    model.findById(req.params.id, function (err, entity) {
        if (err) {
          return res.status(500).send(err);
        }
        if (!entity || entity.password !== req.params.password) {
          return res.sendStatus(404);
        }
        else {
            Object.assign(entity, req.body);
            entity.save(function (err) {
                if (err) {
                    return res.status(422).json(err);
                } else {
                    return res.sendStatus(204)
                }
            });
        }
    });
}

/**
 * Get a model
 */
function _geter(req, res) {
    model.findById(req.params.id).lean().exec(function (err, entity) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!entity) {
            return res.sendStatus(404);
        } else {
            entity.canEdit = entity.password == req.params.password ? true : false;
            delete entity.password;
            return res.json({data:entity});
        }
    });
}

/**
 * Create a model
 */
function _creater(req, res) {
    var newEnt = new model(req.body);
    newEnt.save(function (err, entity) {
        if (err) {
            return res.status(422).json(err);
        } else {
            return res.json(entity);
        }
    });
}


module.exports = {
    deleter: _deleter,
    modifier: _modifier,
    geter: _geter,
    creater: _creater
};
