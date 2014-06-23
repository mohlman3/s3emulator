var express = require('express');
var config = require('config');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var setDefaults = function () {
    if (!config.FILE_STORE_PATH) {
        config.FILE_STORE_PATH = 'c:\\temp\\s3emulator';
    }

    if (!config.PORT) {
        config.PORT = 3000;
    }

    if (!config.LOGGING) {
        config.LOGGING = true;
    }
}

var getFileDetails = function (file) {
    var rootPath = config.FILE_STORE_PATH;
    var dirPath = rootPath;
    var fileName = file;

    if (file.indexOf('..') > -1) {
        return false;
    }

    var parts = file.split('/');
    if (parts.length > 1) {
        // we are writing to a directory
        // file name is last argument
        fileName = parts.splice(parts.length - 1, 1);
        fileName = fileName[0];

        // add the root path to the rest of it
        parts.splice(0, 0, rootPath);
        dirPath = path.join.apply(path, parts);
    }

    var filePath = path.join(dirPath, fileName);

    return { dirPath: dirPath, fileName: fileName, filePath: filePath };
}

var app = express();

app.get('/*', function(req, res){
    var file = req.params[0];

    if (config.LOGGING)
        console.log('GET ' + file);

    var details = getFileDetails(file);

    if (!details) {
        res.send(500);
    }

    var dirPath = details.dirPath;
    var filePath = details.filePath;

    var stream = fs.createReadStream(filePath);
    stream.on('error', function (e) {
       if (e.code === 'ENOENT')	
          res.send(404);
       else
          res.send(500);
    });

    stream.on('finish', function () {
        res.end();
    });

    stream.pipe(res);
});

app.post('/*', function (req, res) {
   var file = req.params[0];

    if (config.LOGGING)
        console.log('POST ' + file);

   var details = getFileDetails(file);
   if (!details) {
      res.send(500);
   }

   var dirPath = details.dirPath;
   var filePath = details.filePath;

   fs.exists(filePath, function (exists) {
      if (exists) {
         res.send(409);
      } else {
          mkdirp(dirPath, function (err) {
              if (err) {
                  res.send(500);
              } else {
                  var stream = fs.createWriteStream(filePath);
                  req.pipe(stream);
                  res.status(201);
                  res.end();
              }
          });
      }
   });
});

app.put('/*', function (req, res) {
    var file = req.params[0];

    if (config.LOGGING)
        console.log('PUT ' + file);

    var details = getFileDetails(file);
    if (!details) {
        res.send(500);
    }

    var filePath = details.filePath;

    fs.exists(filePath, function (exists) {
        if (exists) {
            var stream = fs.createWriteStream(filePath);
            stream.on('error', function (e) {
               res.send(500);
            });
            stream.on('finish', function () {
               res.send(200);

	       if (config.LOGGING)
	          console.log('PUT (200)' + file);
            });

            req.pipe(stream);
        } else {
            res.send(404);
        }
    });
});

app.delete('/*', function (req, res) {
    var file = req.params[0];

    if (config.LOGGING)
        console.log('DELETE ' + file);

    var details = getFileDetails(file);
    if (!details) {
        res.send(500);
    }

    var filePath = details.filePath;
    fs.unlink(filePath, function (err) {
       if (err && err.code === 'ENOENT')
          res.send(404);
       else if (err)
          res.send(500);
       else
          res.send(200);

       res.end();
    });
});

setDefaults();

var server = app.listen(config.PORT, function() {
    console.log('s3emulator listening on port %d', server.address().port);
});


