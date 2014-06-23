s3emulator
==========

Lightweight emulator for AWS S3 written in Node.JS.

Clone the repository, install dependencies and run the server.js file:
  
    npm install
    node server

This will launch the S3 emulator on port 3000.  You can then make requests like:

    POST http://localhost:3000/bucket/folder/file.ext

To configure options, copy the config/default.json.defaults file to config/default.json and make changes as neccessary.  The path config/default.json is included in .gitignore.

The most important config option is the path where the files will be stored on disk.

Currently, only GET, POST, PUT, and DELETE options are supported.

Subfolders are supported and will be created as neccessary.  

## CONTRIBUTIONS

Pull requests welcomed.

## LICENSE

Copyright (C) 2014 Matthew Ohlman.


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

