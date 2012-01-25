/**
 * Provides fundamental smoke test to the server
 * Can be used as a diagnostic tool 
 * to detect and manage first level problems during system maintenance.
 */

var restt = require( 'restt' );

// Config parameters for the server
var serverPort = 3002;
var host = 'localhost';


describe( 'Check the working of services on the server', function()
{
    describe( 'GET /isAlive', function()
    {
        it( 'should respond with true',
            restt.get( host, serverPort, '/isAlive', 'true\n' ))
    })

    describe( 'GET /orgUnitsByKey', function()
    {
        it( 'should have status equals to 200',
            restt.get( host, serverPort, '/orgUnitsByKey' ))
    })

    describe( 'GET /login', function()
    {
        it( 'should have status equals to 200',
            restt.get( host, serverPort, '/login' ))
    })
})
