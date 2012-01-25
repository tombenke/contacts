function( doc )
{
    var type = 'untyped';

    if( doc.type )
    {
        type = doc.type;
    }

    emit( type, doc );
}
