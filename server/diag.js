function isAlive( request, response )
{
    response.header( 'Content-Type', 'application/json' );

    response.write( 'true' );
    response.end( '\n' );
};

exports.isAlive = isAlive;
