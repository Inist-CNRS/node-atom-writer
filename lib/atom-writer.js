'use strict';
var assert = require('assert')

function pad(n) {
  return n < 10 ? '0' + n : n
}

function date2string(d) {
  return d.getUTCFullYear() + '-'
  + pad(d.getUTCMonth() + 1) + '-'
  + pad(d.getUTCDate()) + 'T'
  + pad(d.getUTCHours()) + ':'
  + pad(d.getUTCMinutes()) + ':'
  + pad(d.getUTCSeconds()) + 'Z'
}


function ATOMWriter(writer) {
  if (!(this instanceof ATOMWriter)) {
    return new ATOMWriter(writer);
  }
  assert.equal(typeof writer, 'object')

  this.writer = writer

}

ATOMWriter.prototype = {
  flush: function () {
    this.writer.flush()
    return this
  },
  startFeed: function (id, updated, created) {
    if (updated === undefined) {
      updated = new Date()
    }
    assert.equal(typeof id, 'string')
    assert(updated instanceof Date)
    this.writer.startElement('feed')
    this.writer.writeAttribute('xmlns', 'http://www.w3.org/2005/Atom')
    this.writer.writeAttributeNS('xmlns','opensearch', null,'http://a9.com/-/spec/opensearch/1.1/')
    this.writer.writeElement('id', id)
    if (created instanceof Date) {
      this.writer.writeElement('created', date2string(created))
    }
    this.writer.writeElement('updated', date2string(updated))
    return this
  },
  writeTitle: function (value, type, lang) {
    if (type === undefined) {
      type = 'text'
    }
    assert.equal(typeof value, 'string')
    assert.equal(typeof type, 'string')
    this.writer.startElement('title')
    this.writer.writeAttribute('type', type)
    if (typeof lang === 'string') {
      this.writer.writeAttributeNS('xml','lang', null,lang)
    }
    this.writer.text(value)
    this.writer.endElement()
    return this
  },
  writeLink: function (value, type, rel) {
    if (type === undefined) {
      type = 'text/html'
    }
    assert.equal(typeof value, 'string')
    assert.equal(typeof type, 'string')
    this.writer.startElement('link')
    this.writer.writeAttribute('type', type)
    this.writer.writeAttribute('href', value)
    if (rel !== undefined) {
      this.writer.writeAttribute('rel', rel)
    }
    this.writer.endElement()
    return this
  },
  writeAuthor: function (name, email, uri) {
    this.writer.startElement('author')
    if (typeof name === 'string') {
      this.writer.writeElement('name', name)
    }
    if (typeof email === 'string') {
      this.writer.writeElement('email', email)
    }
    if (typeof uri === 'string') {
      this.writer.writeElement('uri', uri)
    }
    this.writer.endElement()
    return this
  },
  writeAuthorRAW: function (string) {
    assert.equal(typeof string, 'string')
    var email, author, index = string.search(/@/)
    if (index !== -1) {
      email = string
      author = string.substr(0, index)
    }
    else {
      email = null
      author = string
    }
    return this.writeAuthor(author, email)
  },
  writeContributor: function (name, email, uri) {
    assert.equal(typeof name, 'string')
    this.writer.startElement('contributor');
    if (typeof name === 'string') {
      this.writer.writeElement('name', name)
    }
    if (typeof email === 'string') {
      this.writer.writeElement('email', email)
    }
    if (typeof uri === 'string') {
      this.writer.writeElement('uri', uri)
    }
    this.writer.endElement()
    return this
  },
  writeCategory: function (term, scheme, label) {
    assert.equal(typeof term, 'string')
    this.writer.startElement('category')
    if (typeof term === 'string') {
      this.writer.writeAttribute('term', term)
    }
    if (typeof scheme === 'string') {
      this.writer.writeAttribute('scheme', scheme)
    }
    if (typeof label === 'string') {
      this.writer.writeAttribute('label', label)
    }
    this.writer.endElement()
    return this
  },
  startEntry: function (id, updated, created) {
    assert.equal(typeof id, 'string')
    if (updated === undefined) {
      updated = new Date()
    }
    assert.equal(typeof id, 'string')
    assert(updated instanceof Date)

    this.writer.startElement('entry')
    this.writer.writeElement('id', id)
    if (created instanceof Date) {
      this.writer.writeElement('updated', date2string(created))
    }
    else {
      this.writer.writeElement('updated', date2string(updated))
    }
    this.writer.writeElement('published', date2string(updated))
    return this
  },
  writeContent: function (value, type, lang) {
    assert.equal(typeof value, 'string')
    this.writer.startElement('content')
    if (typeof type === 'string') {
      this.writer.writeAttribute('type', type)
    }
    if (typeof lang === 'string') {
      this.writer.writeAttributeNS('xml','lang', null, lang)
    }
    this.writer.text(value)
    this.writer.endElement()
    return this
  },
  endEntry: function () {
    this.writer.endElement()
    return this
  },
  endFeed: function () {
    this.writer.endElement()
    return this
  },
  writeSearch: function (url) {
    assert.equal(typeof value, 'string')
    this.writeLink(url, 'application/opensearchdescription+xml', 'search')
    return this
  },
  writeTotalResults: function (value) {
    assert.equal(typeof value, 'number')
    this.writer.startElementNS('opensearch','totalResults')
    this.writer.text(value.toString())
    this.writer.endElement()
    return this
  },
  writeStartIndex: function (value) {
    if (value === undefined || value ===  null) {
      value = 0
    }
    assert.equal(typeof value, 'number')
    this.writer.startElementNS('opensearch','startIndex')
    this.writer.text(value.toString())
    this.writer.endElement()
    return this
  },
  writeItemsPerPage: function (value) {
    if (value === undefined || value ===  null) { 
      value = 20
    }
    assert.equal(typeof value, 'number')
    this.writer.startElementNS('opensearch','itemsPerPage')
    this.writer.text(value.toString())
    this.writer.endElement()
    return this
  },
  writeQuery: function (searchTerms, startPage, role) {
    if (startPage === undefined) {
      startPage = 0;
    }
    if (role === undefined) {
      role = 'request'
    }
    assert.equal(typeof searchTerms, 'string')
    assert.equal(typeof startPage, 'number')
    assert.equal(typeof role, 'string')
    this.writer.startElementNS('opensearch','Query')
    this.writer.writeAttributeNS('opensearch','searchTerms',null,searchTerms)
    this.writer.writeAttributeNS('opensearch','startPage',null,startPage.toString())
    this.writer.writeAttributeNS('opensearch','role',null,role)
    this.writer.endElement()
    return this
  },
  writeGenerator: function (value, version, uri) {
    assert.equal(typeof value, 'string')
    this.writer.startElement('generator');
    if (typeof value === 'string') {
      this.writer.text(value)
    }
    if (typeof version === 'string') {
      this.writer.writeAttribute('version', version)
    }
    if (typeof uri === 'string') {
      this.writer.writeAttribute('uri', uri)
    }
    this.writer.endElement()
    return this
  },
}

module.exports = ATOMWriter
