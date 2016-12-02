'use strict';



/**
 * Deletes a model
 */
function deleter(model) {
    return function(req, res) {
        model.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(204).send('No Content');
        });
    };
}

/**
 * Modifies a model
 */
function modifier(model) {
    return function(req, res, next) {
        model.findById(req.params.id, function(err, entity) {
            if (err) return next(err);
            if (!entity) return res.sendStatus(404);
            Object.assign(entity, req.body);
            entity.save(function(err) {
                if (err) {
                    return res.status(422).json(err);
                }
                res.sendStatus(204)
            });
        });
    };
}

/**
 * Get a model
 */
function geter(model) {
    return function(req, res, next) {
        model.findById(req.params.id, function(err, entity) {
            if (err) {
                return next(err);
            }

            if (!entity) {
                return res.sendStatus(404);
            }

            res.json(entity);
        });
    };
}

/**
 * Create a model
 */
function creater(model) {
    return function(req, res) {
        var newEnt = new model(req.body);
        newEnt.save(function(err, entity) {
            if (err) {
                return res.status(422).json(err);
            }
            res.json(entity);
        });
    };
}


module.exports = function(path) {
    var Model = require(path);
    return {
        deleter: deleter(Model),
        modifier: modifier(Model),
        geter: geter(Model),
        creater: creater(Model),
    };
};
