'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _configs = require('configs');

var _configs2 = _interopRequireDefault(_configs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApiUtilities() {} // Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

ApiUtilities.prototype.getJson = function (apiName, resourceName, ajaxOptionsOrSuccess, ajaxOptions) {
    var self = this;
    ajaxOptions = ajaxOptions || {};
    var options = {};

    var overridingOtpions = {
        dataType: 'json',
        url: self.url(apiName, resourceName)
    };

    if (_lodash2.default.isFunction(ajaxOptionsOrSuccess)) {
        options = _jquery2.default.extend({}, options, ajaxOptions, overridingOtpions);
        options.success = ajaxOptionsOrSuccess;
    } else {
        options = _jquery2.default.extend({}, options, ajaxOptionsOrSuccess, overridingOtpions);
    }

    return _jquery2.default.ajax(options);
};

ApiUtilities.prototype.postJson = function (apiName, resourceName, data, ajaxOptions) {
    var self = this;

    var options = _jquery2.default.extend({}, ajaxOptions, {
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: self.url(apiName, resourceName),
        data: JSON.stringify(data),
        dataType: 'json'
    });

    return _jquery2.default.ajax(options);
};

ApiUtilities.prototype.putJson = function (apiName, resourceName, data, ajaxOptions) {
    var self = this;

    var options = _jquery2.default.extend({}, ajaxOptions, {
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        url: self.url(apiName, resourceName),
        data: JSON.stringify(data),
        dataType: 'json'
    });

    return _jquery2.default.ajax(options);
};

ApiUtilities.prototype.delete = function (apiName, resourceName, ajaxOptions) {
    var self = this;

    var options = _jquery2.default.extend({}, ajaxOptions, {
        type: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        url: self.url(apiName, resourceName)
    });

    return _jquery2.default.ajax(options);
};

ApiUtilities.prototype.url = function (apiName, resourceName) {
    return tryGetApiBasePathFromConfigs(apiName) + '/' + resourceName;
};

function tryGetApiBasePathFromConfigs(apiName) {
    if (!apiName) {
        throw new Error('api-utilities - apiName parameter is required.');
    }

    if (!_configs2.default || !_configs2.default.apis || !_configs2.default.apis[apiName]) {
        throw new Error('api-utilities - no configs for \'' + apiName + '\'.');
    }

    if (!_configs2.default.apis[apiName].baseUrl) {
        throw new Error('api-utilities - no basePath config in configs for \'' + apiName + '\'.');
    }

    return _configs2.default.apis[apiName].baseUrl;
}

exports.default = new ApiUtilities();