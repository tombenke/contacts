Ext.define(
    'ContactManager.model.OrgUnits',
    {
        extend: 'Ext.data.Model',
        fields: [
            {
                type: 'string',
                name: 'id'
            },
            {
                type: 'string',
                name: 'key'
            },
            {
                type: 'string',
                name: 'path'
            },
            {
                type: 'string',
                name: 'name'
            },
            {
                type: 'string',
                name: 'abbreviation'
            },
            {
                type: 'string',
                name: 'unitType'
            },
            {
                type: 'string',
                name: 'fullName',
                convert: function( value, record )
                {
                    var name  = record.get( 'name' );
                    var path  = record.get( 'path' );

                    return path + ' (' + name + ')';
                }
            }
        ]
    }
);