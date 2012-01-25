Ext.define(
    'ContactManager.store.LocalPersons',
    {
        extend : 'Ext.data.Store',
        model : 'ContactManager.model.Person',
        autoLoad : true,

        sorters: [
            {
                property : 'familyName',
                direction: 'ASC'
            },
            {
                property : 'surName',
                direction: 'ASC'
            }
        ],

        proxy: {
            type: 'rest',
            url: 'localPersonsExt',

            reader: {
                type: 'json',
                root: 'data',
                idProperty: '_id',
                successProperty: 'success'
            }
        }
    }
);