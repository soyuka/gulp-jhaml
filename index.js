'use strict'
const stream = require('stream')
const util = require('util')
const jhaml = require('@soyuka/jhaml')
const gutil = require('gulp-util')
const PluginError = gutil.PluginError;
const through = require('through2')

const PLUGIN_NAME = 'gulp-jhaml'

module.exports = function(scope, opts) {
  if(!opts)
    opts = {}

  if(opts.eval === undefined)
    opts.eval = true

  return through.obj(function(file, encoding, cb) {
    if(file.isNull()) {
      return cb(null, file)
    }

    opts.filename = file.path

    let streamer = opts.eval ? jhaml(scope, opts) : jhaml.tohtml(scope, opts)
    streamer.on('error', this.emit.bind(this, 'error'))

    if(file.path) {
      file.path = file.path.replace(/\.haml$/, '.html')
      file.extname = '.html'
    }

    if(file.isBuffer()) {
      let self = this

      streamer.write(file.contents)
      streamer.end()

      let content = []

      streamer.on('data', function(d) {
        content.push(d)
      })

      streamer.on('end', function() {
        file.contents = Buffer.concat(content)
        self.push(file)
        return cb()
      })
    }

    if(file.isStream()) {
      //streams
      file.contents = file.contents.pipe(streamer)

      this.push(file)

      return cb()
    }
  })
}
