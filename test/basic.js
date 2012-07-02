'use strict';
var XMLWriter = require('xml-writer')
var ATOMWriter = require('../')

exports['setUp'] = function (callback) {
  this.xw = new XMLWriter(false)
  this.aw = new ATOMWriter(this.xw);
  callback();
}

exports['t01'] = function (test) {

  var created = new Date(365 * 24 * 60 * 60 * 1000)
  var updated = new Date(365 * 24 * 60 * 60 * 1000)

  this.aw
  .startFeed('urn:tps:com-idx', updated, created)
  .writeStartIndex(1)
  .writeItemsPerPage(10)
  .writeTotalResults(100)
  .writeTitle('Index of /')
  .writeLink('http://exemple.com/feed.xml', 'application/atom+xml', 'self')

  this.aw
  .startEntry('urn:tps:com-idx-1', updated, created)
  .writeTitle('Data 1')
  .writeLink('/1.xml', 'text/xml')
  .writeLink('/1.txt', 'text/plain')
  .writeContent('Un', 'text', 'fr')
  .writeAuthor('Tata Toto', 'toto@exemple.com')
  .writeCategory('term', 'http://exemple.com#scheme')
  .endEntry()

  this.aw
  .startEntry('urn:tps:com-idx-2', updated, created)
  .writeTitle('Data 2')
  .writeLink('2.txt', 'text/plain')
  .writeContent('deux', 'text', 'fr')
  .writeAuthorRAW('titi.toto@exemple.com')
  .endEntry()

  this.aw
  .endFeed()
  //console.log(this.xw.toString())
  test.equal(this.xw.toString(), '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/"><id>urn:tps:com-idx</id><created>1971-01-01T00:00:00Z</created><updated>1971-01-01T00:00:00Z</updated><opensearch:startIndex>1</opensearch:startIndex><opensearch:itemsPerPage>10</opensearch:itemsPerPage><opensearch:totalResults>100</opensearch:totalResults><title type="text">Index of /</title><link type="application/atom+xml" href="http://exemple.com/feed.xml" rel="self"/><entry><id>urn:tps:com-idx-1</id><updated>1971-01-01T00:00:00Z</updated><published>1971-01-01T00:00:00Z</published><title type="text">Data 1</title><link type="text/xml" href="/1.xml"/><link type="text/plain" href="/1.txt"/><content type="text" xml:lang="fr">Un</content><author><name>Tata Toto</name><email>toto@exemple.com</email></author><category term="term" scheme="http://exemple.com#scheme"/></entry><entry><id>urn:tps:com-idx-2</id><updated>1971-01-01T00:00:00Z</updated><published>1971-01-01T00:00:00Z</published><title type="text">Data 2</title><link type="text/plain" href="2.txt"/><content type="text" xml:lang="fr">deux</content><author><name>titi.toto</name><email>titi.toto@exemple.com</email></author></entry></feed>')
  test.done()
};
