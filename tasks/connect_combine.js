/*
 * grunt-connect-combine
 * https://github.com/Athaphian/grunt-connect-combine
 *
 * Copyright (c) 2014 Bas Biesheuvel
 * Licensed under the MIT license.
 */

'use strict';

// Export the combine API.
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