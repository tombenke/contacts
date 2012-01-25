Ext.define(
    'ContactManager.view.person.Edit',
    {
        extend : 'Ext.window.Window',
        alias : 'widget.personedit',

        title : 'Edit Person',
        layout : 'fit',
        autoShow : true,

        initComponent: function()
        {
            this.items = [
                {
//                    title: 'Person Details',
                    xtype : 'form',
                    frame: true,
                    width: 340,
                    bodyPadding: 5,

                    fieldDefaults: {
                        msgTarget: 'side',
                        anchor: '-20',
                        labelAlign: 'left',
                        labelWidth: 90,
                        anchor: '100%'
                    },
                    items : [
                        {
                            xtype: 'combo',
                            store: 'PersonTitle',
                            valueField: 'abbr',
                            displayField: 'text',
                            fieldLabel : 'Title',
                            name : 'sex',
                            allowBlank : false
                        },
                        {
                            fieldLabel : 'Family name',
                            name : 'familyName',
                            xtype : 'textfield',
                            emptyText : 'Enter family name',
                            allowBlank : false
                        },
                        {
                            fieldLabel : 'Surname',
                            name : 'surName',
                            xtype : 'textfield',
                            emptyText : 'Enter surname',
                            allowBlank : false
                        },
                        {
                            fieldLabel : 'Is local',
                            name : 'isLocal',
                            xtype: "checkbox",
                            inputValue: true,
                            uncheckedValue: false
                        },
                        {
                            fieldLabel : 'Company',
                            name : 'company',
                            xtype : 'textfield',
                            allowBlank : false
                        },
                        {
                            fieldLabel : 'Org. unit',
                            name : 'orgUnit',
                            store: 'OrgUnits',
                            queryMode: 'remote',
                            displayField: 'path',
                            valueField: 'key',
                            xtype : 'combo',
                            typeAhead: false,
                            allowBlank : false
                        },
                        {
                            fieldLabel : 'Email',
                            name : 'email',
                            xtype : 'textfield',
                            emptyText : 'Enter e-mail address',
                            allowBlank : false
                        },
                        {
                            fieldLabel : 'Mobile',
                            name : 'mobile',
                            emptyText : 'Enter mobile number',
                            xtype : 'textfield'
                        },
                        {
                            fieldLabel : 'Phone',
                            name : 'phone',
                            emptyText : 'Enter work phone number',
                            xtype : 'textfield'
                        },
                        {
                            fieldLabel : 'Fax',
                            name : 'fax',
                            emptyText : 'Enter office fax number',
                            xtype : 'textfield'
                        },
                        {
                            fieldLabel : 'Web',
                            name : 'web',
                            xtype : 'textfield',
                            emptyText : 'Enter web address'
                        },
                        {
                            fieldLabel : 'Comment',
                            name : 'comment',
                            emptyText : 'Enter comments and remarks',
                            xtype : 'textareafield'
                        }
                    ]
                }
            ];

            this.buttons = [
                {
                    text: 'Save',
                    action: 'save'
                },
                {
                    text: 'Cancel',
                    scope: this,
                    handler: this.close
                }
            ];

            this.callParent( arguments );
        }
    }
);