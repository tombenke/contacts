Ext.define(
    'ContactManager.model.Person',
    {
        extend: 'Ext.data.Model',
        fields: [
            { name: '_id', type: "string" },
            { name: 'type', type: "string" },
            { name: 'lastUpdate', type: "string" },

            { name: 'sex', type: "string" },
            { name: 'familyName', type: "string" },
            { name: 'surName', type: "string" },
            { name: 'isLocal', type: "string" },
            { name: 'company', type: "string" },
            { name: 'orgUnit', type: "string" },
            { name: 'email', type: "string" },
            { name: 'mobile', type: "string" },
            { name: 'phone', type: "string" },
            { name: 'fax', type: "string" },
            { name: 'web', type: "string" },
            { name: 'comment', type: "string" },
            {
                type: 'string',
                name: 'fullName',
                convert: function( value, record )
                {
                    var surName  = record.get( 'surName' );
                    var familyName  = record.get( 'familyName' );

                    return familyName.toUpperCase() + ', ' + surName;
                }
            }
        ]
    }
);