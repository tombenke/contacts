Ext.require( 'Ext.container.Viewport' );

Ext.application(
    {
        name: 'ContactManager',
        appFolder: 'app',

        controllers: [
            'Persons'
        ],

        launch: function()
        {
            Ext.create(
                'Ext.container.Viewport',
                {
                    layout: 'border',
                    renderTo: Ext.getBody(),
                    items: [
                        {
                            region: 'north',
                            html: '<h1 class="x-panel-header">Contact Manager<span id="logout"><a href="/logout">sign-out</a></span></h1>',
                            autoHeight: true,
                            border: false,
                            margins: '0 0 5 0'
                        },
                        {
                            region: 'center',
                            xtype: 'tabpanel', // TabPanel itself has no title
                            activeTab: 0,      // First tab active by default
                            items: [
                                {
                                    title: 'Contacts',
                                    xtype: 'personlist'
                                },
                                {
                                    title: 'Help',
                                    xtype: 'panel',
                                    html: '<div id="help" /> This is the help...',
                                    flex: 1,
                                    autoScroll: true
                                }
                            ]
                        }
                    ]
                }
            );
//            Ext.get( 'help' ).load({
//                url: 'help.html',
//                scripts: true
//            });

            // Remove the loading message
            Ext.get('loading').remove();
            Ext.fly('loading-mask').animate({
                opacity: 0,
                remove: true
            });
        }
    }
);