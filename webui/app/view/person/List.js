Ext.define(
    'ContactManager.view.person.List',
    {
        extend: 'Ext.grid.Panel',
        alias : 'widget.personlist',

        title : 'All Persons',
        store : 'Persons',

        initComponent: function()
        {
            var grid = this;
            this.columns = [
                { header: 'Family name',  dataIndex: 'familyName',  flex: 1  },
                { header: 'Surname',  dataIndex: 'surName',  flex: 1  },
                { header: 'IsLocal',  dataIndex: 'isLocal',  flex: 1  },
                { header: 'Company',  dataIndex: 'company',  flex: 1  },
                { header: 'Org. Unit',  dataIndex: 'orgUnit',  flex: 1  },
//                { header: 'Sub Org. Unit',  dataIndex: 'subOrgUnit',  flex: 1  },
                {
                    header: 'Email',
                    dataIndex: 'email',
                    renderer: function( value ) {
                        return Ext.String.format( '<a href="mailto:{0}">{1}</a>', value, value );
                    },
                    flex: 1
                },
                { header: 'mobile', dataIndex: 'mobile', flex: 1  },
                { header: 'phone', dataIndex: 'phone', flex: 1  },
                { header: 'fax', dataIndex: 'fax', flex: 1  },
                {
                    header: 'web',
                    dataIndex: 'web',
                    renderer: function( value ) {
                        return Ext.String.format( '<a href="{0}" target="_blank">{1}</a>', value, value );
                    },
                    flex: 1
                },
                { header: 'comment', dataIndex: 'comment', flex: 1, hidden: true  }
            ];

            this.dockedItems = [{
                xtype: 'toolbar',
                items: [
                    {
                        itemId: 'addNewPerson',
                        text: 'Add',
                        tooltip: 'Add new person',
                        iconCls: 'icon-add'
                    },
                    '-',
                    {
                        itemId: 'deleteSelectedPersons',
                        text: 'Delete',
                        tooltip: 'Remove the selected person',
                        iconCls: 'icon-delete',
                        disabled: false,
                        handler: function()
                        {
                            var selection = grid.getView().getSelectionModel().getSelection()[0];
                            if( selection )
                            {
                                grid.store.remove(selection);
                                grid.store.sync();
                            }
                        }
                    },
                    '-',
                    {
                        xtype: 'box',
                        autoEl: {
                            tag: 'a',
                            target: '_blank',
                            href: 'persons.csv',
                            html: 'Export to CSV'
                        }
                    }
                ]
            }];

            this.callParent( arguments );
        }
    }
);