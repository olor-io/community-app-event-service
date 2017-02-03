var _ = require('lodash');
var Joi = require('joi');
var bookshelf = require('../database').connect().bookshelf;
var modelUtils = require('./model-utils');
var BaseModel = modelUtils.createBaseModel(bookshelf);
var CONST = require('../constants');

var schema = {
    // Id, creation time and modification time are specified in base model on default
    userId: modelUtils.bigInteger().required(),
    eventId: modelUtils.bigInteger().required()
};

var UserEvent = BaseModel.extend({
    tableName: 'user_events',
    schema: schema,

    initialize: function() {
        BaseModel.prototype.initialize.apply(this, arguments);
    },

    events: function() {
        return this.belongsTo('Event');
    },

    users: function() {
        return this.belongsTo('User');
    }
});

module.exports = bookshelf.model('UserEvent', UserEvent);