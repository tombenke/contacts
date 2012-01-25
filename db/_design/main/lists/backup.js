function( head, req )
{
    start(
        {
            "headers" : {
                "Content-Type" : "application/json; charset=utf-8"
            }
        }
    );

    var sep = '\n';
    var row;

    send( '{ "docs": [\n' );

    while( row = getRow() )
    {
        var value = row.value;
        delete value[ '_rev' ];

        send( sep );
        send( toJSON( value ) );
        sep = ', \n';
    }
    return "\n]}";
}