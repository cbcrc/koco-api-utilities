// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['jquery', 'configs', 'lodash'],
    function($, configs, _) {
        'use strict';

        function ApiUtilities() {}

        ApiUtilities.prototype.getJson = function(apiName, resourceName, ajaxOptionsOrSuccess, ajaxOptions) {
            var self = this;
            ajaxOptions = ajaxOptions || {};
            var options = {};

            var overridingOtpions = {
                dataType: 'json',
                url: self.url(apiName, resourceName)
            };

            if (_.isFunction(ajaxOptionsOrSuccess)) {
                options = $.extend({}, options, ajaxOptions, overridingOtpions);
                options.success = ajaxOptionsOrSuccess;
            } else {
                options = $.extend({}, options, ajaxOptionsOrSuccess, overridingOtpions);
            }

            return $.ajax(options);
        };

        ApiUtilities.prototype.postJson = function(apiName, resourceName, data, ajaxOptions) {
            var self = this;

            var options = $.extend({}, ajaxOptions, {
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: self.url(apiName, resourceName),
                data: JSON.stringify(data),
                dataType: 'json'
            });

            return $.ajax(options);
        };

        ApiUtilities.prototype.putJson = function(apiName, resourceName, data, ajaxOptions) {
            var self = this;

            var options = $.extend({}, ajaxOptions, {
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                url: self.url(apiName, resourceName),
                data: JSON.stringify(data),
                dataType: 'json'
            });

            return $.ajax(options);
        };

        ApiUtilities.prototype.delete = function(apiName, resourceName, ajaxOptions) {
            var self = this;

            var options = $.extend({}, ajaxOptions, {
                type: 'DELETE',
                contentType: 'application/json; charset=utf-8',
                url: self.url(apiName, resourceName)
            });

            return $.ajax(options);
        };

        ApiUtilities.prototype.url = function(apiName, resourceName) {
            return tryGetApiBasePathFromConfigs(apiName) + '/' + resourceName;
        };

        function tryGetApiBasePathFromConfigs(apiName) {
            if (!apiName) {
                throw new Error('api-utilities - apiName parameter is required.');
            }

            if (!configs || !configs.apis || !configs.apis[apiName]) {
                throw new Error('api-utilities - no configs for \'' + apiName + '\'.');
            }

            if (!configs.apis[apiName].baseUrl) {
                throw new Error('api-utilities - no basePath config in configs for \'' + apiName + '\'.');
            }

            return configs.apis[apiName].baseUrl;
        }

        return new ApiUtilities();
    });
