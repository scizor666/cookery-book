# Cookery Book [![Build Status](https://travis-ci.org/scizor666/cookery-book.svg?branch=master)](https://travis-ci.org/scizor666/cookery-book) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Ruby version: 2.4.1

yarn must be installed, for example through brew ( `brew install yarn` )

the following env variables must be set since the application actively uses s3 as a storage:

```
S3_BUCKET_NAME
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

for local run:

```
$ gem install bundler
$ bundle
$ ./bin/rails db:migrate  
$ ./bin/server
```
