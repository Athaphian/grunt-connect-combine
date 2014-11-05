/*
 * grunt-connect-combine
 * https://github.com/Athaphian/grunt-connect-combine
 *
 * Copyright (c) 2014 Bas Biesheuvel
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var send = require('send');

/**
 * Export the combine API.
 *
 * Combines multiple directories behind one request. It searches for the file in each directory from top
 * to bottom. I the file is found in one directory, the routine stops and returns this file.
 */
module.exports = function (regexp, paths) {
  return function (req, res, next) {
    // Match URL to regexp
    var matches = req.url.match(regexp);
    if (matches) {
      var fileName = matches[1];

      // Loop over the configured paths
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var isLast = i === paths.length - 1;

        // If file exists OR this is the last path in the list
        if (grunt.file.exists(path + fileName) || isLast) {
          var stream = send(req, matches[1], {
            maxage: 0,
            root: path
          });
          stream.pipe(res);
          return;
        }
      }
    } else {
      return next();
    }
  }
};