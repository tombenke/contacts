% Tamás Benke
% **The NoSQL the RIA and the REST...**
  Installation of the required tools and software
% January 13, 2012


## IDE

Any type of editor or IDE that supports syntax highlightes for 
JavaScript, YAML, JSON, HTML and CSS.

We will use NetBeans 7.0, but Eclipse is also appropriate

## Utilities

### curl

curl is a command line tool for transferring data with URL syntax, 
supporting DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, 
POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMTP, SMTPS, TELNET and TFTP.

curl supports SSL certificates, HTTP POST, HTTP PUT, FTP uploading, 
HTTP form based upload, proxies, cookies, user+password authentication 
(Basic, Digest, NTLM, Negotiate, kerberos...), 
file transfer resume, proxy tunneling and a busload of other useful tricks.

website: <http://curl.haxx.se>

installation (Unix, Win32): <http://curl.haxx.se/docs/install.html>

on Ubuntu simply execute:

    apt-get install curl

## Middleware

### Node.js

Node.js is a platform built on Chrome's JavaScript runtime for easily building fast,
scalable network applications.

Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient,
perfect for data-intensive real-time applications that run across distributed devices.

we will use Node.js for the following purposes:

- web server and middleware
- unit-testing
- writing and running small command-line utilities

website: <http://nodejs.org>

installation: <http://nodejs.org/#download>

on Ubuntu, execute:

    apt-get install nodejs

### NPM

npm is a package manager for node. 
You can use it to install and publish your node programs.

It manages dependencies and does other cool stuff.

we will use NPM to

- retrieve the required packages from central repositories
- create and deploy own packages

website: <http://npmjs.org/>

to install, execute the following:

    curl http://npmjs.org/install.sh | sh

or

    curl -O http://npmjs.org/install.sh
    # inspect file..
    sudo sh install.sh

The ~/.npmrc should contain the following if use it in the LSYH network, behind the proxy

    registry = http://registry.npmjs.org/
    http_proxy = http://proxy:3128
    proxy = http://proxy:3128/

#### Required global node modules

install the following modules into the global npm cache

- coffee-script
- express
- jasmine-node
- mocha
- should

use the following command:

    npm install -g coffee-script express # ... etc.

## NoSQL DBMS

### CouchDB

Apache CouchDB is a document-oriented database that can be queried and indexed 
using JavaScript in a MapReduce fashion. 

CouchDB also offers incremental replication with bi-directional 
conflict detection and resolution.
 
CouchDB provides a RESTful JSON API than can be accessed 
from any environment that allows HTTP requests. 

We will use CouchDB to

- store JSON format documents in it
- write map / reduce queries to find and retrieve the stored documents

website: <http://couchdb.apache.org/>

installation: <http://wiki.apache.org/couchdb/Installation>

see also:

<http://tombenke.couchone.com/couchme/_design/couchme/index.html>


### CouchApp

The CouchApp command line tool is used to generate code templates in your application 
and to push your changes to an instance of couchdb, among other things.

We will use CouchApp only to deploy the so called design documents 
(which holds the map / reduce queries) into the couchDB database

website: <http://couchapp.org/page/index>

installation: <http://couchapp.org/page/installing>

see also:

<http://tombenke.couchone.com/couchme/_design/couchme/index.html>

## ExtJS 4.0 RIA framework

Ext JS 4 JavaScript Framework is a Rich Apps that works in Every Browser

We will use ExtJS to implement the client side RIA frontend.

website: <http://www.sencha.com/products/extjs/>

download: <http://www.sencha.com/products/extjs/download?page=a>
