# ATOMWriter for NodeJS


ATOMWriter is small class, that provides methods to generate an [ATOM feed](http://www.atomenabled.org/).
XML is still valid by using [XMLWriter](https://github.com/lindory-project/node-xml-writer)


## Contributors

  * [Nicolas Thouvenin](https://github.com/touv) 

# Installation

With [npm](http://npmjs.org) do:

    $ npm install atom-writer


# Examples

## Basic
```javascript

var XMLWriter = require('xml-writer')
var ATOMWriter = require('atom-writer')

xw = new XMLWriter(true)
aw = new ATOMWriter(xw)

aw
  .startFeed('urn:xxx:yyy')
  .writeStartIndex(1)
  .writeItemsPerPage(10)
  .writeTotalResults(100)
  .writeTitle('Index of /')
  .writeLink('http://exemple.com/feed.xml', 'application/atom+xml', 'self')

aw
  .startEntry('urn:xxx:yyy-1')
  .writeTitle('Data 1')
  .writeLink('/1.xml', 'text/xml')
  .writeLink('/1.txt', 'text/plain')
  .writeContent('Un', 'text', 'fr')
  .writeAuthor('Tata Toto', 'toto@exemple.com')
  .writeCategory('term', 'http://exemple.com#scheme')
  .endEntry()

aw
  .startEntry('urn:xxx-yyy-2')
  .writeTitle('Data 2')
  .writeLink('2.txt', 'text/plain')
  .writeContent('deux', 'text', 'fr')
  .writeAuthorRAW('titi.toto@exemple.com')
  .endEntry()

aw
  .endFeed()

console.log(xw.toString())

```
Output:

```xml
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">
  <id>urn:xxx:yyy</id>
  <updated>2012-07-02T15:22:40Z</updated>
  <opensearch:startIndex>1</opensearch:startIndex>
  <opensearch:itemsPerPage>10</opensearch:itemsPerPage>
  <opensearch:totalResults>100</opensearch:totalResults>
  <title type="text">Index of /</title>
  <link type="application/atom+xml" href="http://exemple.com/feed.xml" rel="self"/>
  <entry>
    <id>urn:xxx:yyy-1</id>
    <updated>2012-07-02T15:22:40Z</updated>
    <published>2012-07-02T15:22:40Z</published>
    <title type="text">Data 1</title>
    <link type="text/xml" href="/1.xml"/>
    <link type="text/plain" href="/1.txt"/>
    <content type="text" xml:lang="fr">Un</content>
    <author>
      <name>Tata Toto</name>
      <email>toto@exemple.com</email>
    </author>
    <category term="term" scheme="http://exemple.com#scheme"/>
  </entry>
  <entry>
    <id>urn:xxx-yyy-2</id>
    <updated>2012-07-02T15:22:40Z</updated>
    <published>2012-07-02T15:22:40Z</published>
    <title type="text">Data 2</title>
    <link type="text/plain" href="2.txt"/>
    <content type="text" xml:lang="fr">deux</content>
    <author>
      <name>titi.toto</name>
      <email>titi.toto@exemple.com</email>
    </author>
  </entry>
</feed>
```
	
# API Documentation

### construct (XMLWriter o)
### flush()
### startFeed(String id, Date updated = null, Date created = null) 
### writeTitle(String value, String type = 'text', String lang = null)
### writeLink(String value, String type = 'text/html', String rel = null)
### writeAuthor(String name, String email = null, String uri = null)
### writeAuthorRAW(String value)
### writeContributor(String name, String email = null, String uri = null)
### writeCategory(String term, String scheme = null, String label = null)
### startEntry(String id, Date updated = null, Date created = null)
### writeContent(String value, String type = null, String lang = null)
### endEntry()
### endFeed()
### writeSearch(String url)
### writeTotalResults(String value)
### writeStartIndex(String value)
### writeItemsPerPage(String value)
### writeQuery(String searchTerms, Number startPage = 1, String role = 'request')
### writeGenerator(String value, String version = null, String uri = null)


# Also

* http://dojotoolkit.org/reference-guide/1.7/dojox/atom/io/model.html
* https://github.com/wezm/node-genx

# License

[MIT/X11](./LICENSE)
