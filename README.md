# Gulp jhaml

[![Build Status](https://travis-ci.org/soyuka/gulp-jhaml.svg?branch=master)](https://travis-ci.org/soyuka/gulp-jhaml)

Implements [jHaml](https://github.com/soyuka/jhaml) - accept streams and buffers.

## Installation

```
npm install @soyuka/gulp-jhaml --save-dev
```

## Usage

To keep the gulp constructor simple, this won't output javascript but interpreted javascript instead. Non-interpreted Html is possible by setting `{eval: false}`.

### Simple example

By default, jhaml will interprete the haml with javascript. You can bind a scope to your templates:

```javascript
const jhaml = require('@soyuka/gulp-jhaml')
const scope = {foo: 'bar'}

gulp.src('source')
.pipe(jhaml(scope))
.pipe(gulp.dest('html'))
```

### Html only

If you don't need any interpolation or any javascript interpetation:

```javascript
const jhaml = require('@soyuka/gulp-jhaml')

gulp.src('source')
.pipe(jhaml({}, {eval: false}))
.pipe(gulp.dest('html'))
```

### More options

- `attributes_separator` (string): a separator for embed attributes. Default to `-`, `{ng: {click: 'test()', if: 'available'}}` will render `ng-click="test()" ng-if: "available"`
- `eval` (boolean): Wether to interprete javascript or not. Note that the behavior of this flag is slightly different from the of the `jhaml` library one. 

