'use strict'
const assert = require('assert');
const es = require('event-stream');
const File = require('vinyl');
const fs = require('fs');
const jhaml = require('../');

const fixtures = `${__dirname}/fixtures`

const scope = {
  disabled: true, 
  select: [{value: 0, text: 'Zero'}, {value: 1, text: 'One'}],
  interpolated: 'Test',
  test: '&<>',
  message: 'it works!',
  stuff: 'just fine!',
  method: function(foo) { return 'bar'; }
}

let result = fs.readFileSync(`${fixtures}/all.html`)

describe('gulp-jhaml', function() {

 describe('streaming', function() {

  it('should transform to html', function(done) {
   let file = new File({
      contents: fs.createReadStream(`${fixtures}/all.haml`)
   }) 

   let jhamlstream = jhaml(scope)
   jhamlstream.write(file)

   jhamlstream.once('data', function(file) {
     assert(file.isStream())
     file.contents.pipe(es.wait(function(err, data) {
       try{
        assert(data.equals(result))
       } catch(e) {
        console.log(data.toString(), result.toString()) 
       }
       done()
     }))
   })
  }) 
 }) 

 describe('buffer', function() {

  it('should transform to html', function(done) {
   let file = new File({
      contents: fs.readFileSync(`${fixtures}/all.haml`)
   }) 

   let jhamlstream = jhaml(scope)
   jhamlstream.write(file)

   jhamlstream.once('data', function(file) {
     assert(file.isBuffer())
     assert(file.contents.equals(fs.readFileSync(`${fixtures}/all.html`)))
     done()
   })
  }) 
 }) 
})
