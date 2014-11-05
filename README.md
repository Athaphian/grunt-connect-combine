grunt-connect-combine
=====================

Grunt plugin for connect to combine directories under one URL.

Takes one regExp that defines the URL and a list of directories it will follow to find the requested file.
The first directory (in order of specification) in which the file is found will be used to serve the file to the
user. If the file is not found in any directory, the last specified directory will be used to serve the file
as if no combine was ever there. This will most likely result in '404 Not Found'.

Usage:

```javascript
middlewares.push(combine(/^\/static\/img\/(.*)/, [
  'app/img_dir_1/',
  'app/img_dir_2/',
  '../anotherproject/app/img_dir/',
  'node_modules/some_node_module/app/img_dir/'
]));
```javascript