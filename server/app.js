var request = require( 'request' );
var express = require( 'express' );
var crypto = require( 'crypto' );
var index = require( './index.js' );
var persons = require( './persons.js' );
var diag = require( 'diag' );

// Load the YAML parser module
require( 'js-yaml' );

// Load the YAML format config file
var configFile = require( './config.yml' )[0];

// Set the config parameters to the selected environment
config = configFile.environments[ configFile.useEnvironment ];

var db = require( 'cdb' ).init( config.dbName );

var app = module.exports = express.createServer();

// Configuration
app.configure(
    function()
    {
        app.set( 'views', __dirname + '/views' );
        app.set( 'view engine', 'hbs' );
        app.use( express.bodyParser() );
        app.use( express.methodOverride() );
        app.use( express.cookieParser() );
        app.use( express.session( { secret: 'keyboard cat' } ) );
        app.use( app.router );
        app.use( express.static( __dirname + '/../webui' ) );
    }
);


app.configure(
    'development',
    function()
    {
        app.use(
            express.errorHandler(
                {
                    dumpExceptions: true,
                    showStack: true
                }
            )
        );
    }
);


app.configure(
    'production',
    function()
    {
        app.use( express.errorHandler() );
    }
);


// Generate a salt for the user to prevent rainbow table attacks
// for better security take a look at the bcrypt c++ addon:
// https://github.com/ncb000gt/node.bcrypt.js
var users = {
    tombenke: {
        name: 'tombenke',
        salt: 'randomly-generated-salt',
        pass: hash('malacka', 'randomly-generated-salt')
    }
};


// Used to generate a hash of the plain-text password + salt
function hash( msg, key )
{
    return crypto.createHmac( 'sha256', key ).update( msg ).digest( 'hex' );
}


// Authenticate using our plain-object database of doom!
function authenticate( name, pass, fn )
{
    var user = users[ name ];

    // query the db for the given username
    if( ! user )
        return fn( new Error( 'cannot find user' ) );

    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we found the user
    if( user.pass == hash( pass, user.salt ) )
        return fn( null, user );

    // Otherwise password is invalid
    fn( new Error( 'invalid password' ) );
}


function restrict( req, res, next )
{
    if( req.session.user )
    {
        next();
    }
    else
    {
        req.session.error = 'Access denied!';
        res.redirect( '/login' );
    }
}

function restrict( req, res, next )
{
    if( req.session.user )
    {
        next();
    }
    else
    {
        req.session.error = 'Access denied!';
        res.redirect( '/login' );
    }
}


function accessLogger( req, res, next )
{
    if( req.session && req.session.user )
    {
        console.log( req.method, req.url, ' by %s', req.session.user.name );
    }
    else
    {
        console.log( req.method, req.url, ' by anonymous' );
    }

    next();
}


// Routes
app.get( '/', restrict, accessLogger, index.index );

app.get( '/persons', restrict, accessLogger, persons.get );
app.post( '/persons', restrict, accessLogger, persons.post );
app.get( '/persons.csv', restrict, accessLogger, persons.getCsv );
app.get( '/personsExt', restrict, accessLogger, persons.getExt );
app.post( '/personsExt', restrict, accessLogger, persons.postExt );
app.put( '/personsExt', restrict, accessLogger, persons.postExt );
app.delete( '/personsExt', restrict, accessLogger, persons.deleteExt );
app.get( '/localPersonsExt', restrict, accessLogger, persons.getLocalExt );
app.get( '/nonLocalPersonsExt', restrict, accessLogger, persons.getNonLocalExt );

app.get( '/orgUnitsByKey', accessLogger, orgUnitsByKey );

app.get( '/isAlive', accessLogger, diag.isAlive );

function orgUnitsByKey( req, resp )
{
    request(
        {
            method: 'GET',
//            uri: 'http://localhost:4000/orgUnitsByKey'
            uri: 'http://localhost:' + config.port + '/data/orgUnits.json'
        },
        function( error, response, body )
        {
            if( response.statusCode == 200 )
            {
                resp.header( 'Content-Type', 'application/json; charset=utf-8' );
                resp.write( body );
                resp.end( '\n' );

            }
            else
            {
                console.log( 'error: '+ response.statusCode )
                console.log( body )
            }
        }
    )
}

app.get( '/logout', function( req, res )
{
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function()
    {
        res.redirect( 'home' );
    });
});

app.get( '/login',
    function( req, res )
    {
        if( req.session.user )
        {
            req.session.success = 'Authenticated as ' + req.session.user.name
            + ' click to <a href="/logout">logout</a>. '
            + ' You may now access <a href="/">/</a>.';
        }
        res.render( 'login' );
    }
);

app.post( '/login',
    function( req, res )
    {
        authenticate(
            req.body.username,
            req.body.password,
            function( err, user )
            {
                if( user )
                {
                    // Regenerate session when signing in
                    // to prevent fixation
                    req.session.regenerate(
                        function()
                        {
                            // Store the user's primary key
                            // in the session store to be retrieved,
                            // or in this case the entire user object
                            req.session.user = user;
                            res.redirect( '/' );
                        }
                    );
                }
                else
                {
                    req.session.error = 'Authentication failed, please check your '
                    + ' username and password.';
                    res.redirect('back');
                }
            }
        );
    }
);

app.listen( config.port );
console.log( "Express server listening on port %d in %s mode",
    app.address().port, app.settings.env );

exports.config = config;