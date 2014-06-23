s3emulator
==========

Lightweight emulator for AWS S3 written in Node.JS.

Clone the repository, install dependencies and run the server.js file:
  
   npm install
   node server

This will launch the S3 emulator on port 3000.

To configure options, copy the config/default.json.defaults file to config/default.json and make changes as neccessary.  The path config/default.json is included in .gitignore.

The most important config option is the path where the files will be stored on disk.

Currently, only GET, POST, PUT, and DELETE options are supported.

Subfolders are supported and will be created as neccessary.  
