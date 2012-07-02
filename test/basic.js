'use strict';
var XMLWriter = require('xml-writer')
var ATOMWriter = require('../')

exports['setUp'] = function (callback) {
  this.xw = new XMLWriter(true)
  this.aw = new ATOMWriter(this.xw);
  callback();
}

exports['t01'] = function (test) {
  this.aw
  .startFeed('urn:tps:com-idx')
  .writeStartIndex(1)
  .writeItemsPerPage(10)
  .writeTotalResults(100)
  .writeTitle('Index of /')
  .writeLink('http://exemple.com/feed.xml', 'application/atom+xml', 'self')

  this.aw
  .startEntry('urn:tps:com-idx-1')
  .writeTitle('Data 1')
  .writeLink('/1.xml', 'text/xml')
  .writeLink('/1.txt', 'text/plain')
  .writeContent('Un', 'text', 'fr')
  .writeAuthor('Tata Toto', 'toto@exemple.com')
  .writeCategory('term', 'http://exemple.com#scheme')
  .endEntry()

  this.aw
  .startEntry('urn:tps:com-idx-2')
  .writeTitle('Data 2')
  .writeLink('2.txt', 'text/plain')
  .writeContent('deux', 'text', 'fr')
  .writeAuthorRAW('titi.toto@exemple.com')
  .endEntry()

  this.aw
  .endFeed()

  console.log(this.xw.toString())

  test.done();
};
