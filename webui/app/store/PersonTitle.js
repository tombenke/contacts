Ext.define(
    'ContactManager.store.PersonTitle',
    {
        extend : 'Ext.data.Store',
        fields: [ 'abbr', 'text' ],
        autoLoad : true,

        data : [
            { "abbr": "male",   "text": "Mr."   },
            { "abbr": "female", "text": "Ms."   }
        ]
    }
);
