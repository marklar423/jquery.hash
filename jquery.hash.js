/*!
* jQuery Hash Plugin
* https://github.com/marklar423/jquery.hash

* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/


(function ($) {
    $.hash = function (key, value) {

        var methods = {

            getHash: function () {
                var hash = decodeURIComponent(window.location.hash.replace('#', ''));
                return methods.deserialize(hash);
            },

            setHash: function (obj) {
                var newHash = $.param(obj);
                newHash = newHash.replace(/\+/g, '%20');
                window.location.hash = newHash;
            },

            deserialize: function (str) {
                var hash = str;
                var split = hash.split('&');

                var obj = {};
                for (var i = 0; i < split.length; i++) {
                    var kv = split[i].split('=');
                    var key = kv[0].replace(/(\[|\])/g, '');
                    var value = decodeURIComponent(kv[1] ? kv[1].replace(/\+/g, ' ') : kv[1]);

                    if (obj[key] instanceof Array == false && kv[0].indexOf('[') != -1) {
                        obj[key] = new Array();
                    }

                    if (obj[key] instanceof Array || obj.hasOwnProperty(key)) {
                        //this property is an array
                        if (obj[key] instanceof Array == false) {
                            var initialValue = obj[key];
                            obj[key] = new Array();
                            obj[key].push(initialValue);
                        }
                        obj[key].push(value);
                    }
                    else {
                        obj[key] = value;
                    }
                }
                return obj;
            }
        };

        if (value === undefined) {
            //get
            return methods.getHash()[key];
        }
        else {
            //set
            var obj = methods.getHash();
            obj[key] = value;
            methods.setHash(obj);            
        }
    }
})(jQuery);