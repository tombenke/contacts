Ext.define(
    'ContactManager.store.OrgUnits',
    {
        extend : 'Ext.data.Store',
        model : 'ContactManager.model.OrgUnits',
        autoLoad : true,
        autosync: true,
        triggerAction: 'all',

        proxy: {
            type: 'rest',
                        url: '/orgUnitsByKey',
//            url: 'http://localhost:4000/orgUnitsByKey',

            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'key',
                successProperty: 'success'
            }
        }
    }
);