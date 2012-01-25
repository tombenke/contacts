Ext.define(
    'ContactManager.controller.Persons',
    {
        extend : 'Ext.app.Controller',

        views : [
            'person.List',
            'person.Edit'
        ],

        stores : [
            'Persons',
            'PersonTitle',
            'OrgUnits'
        ],

        models : [
            'Person',
            'OrgUnits'
        ],

        init : function()
        {
            this.control(
                {
                    'personlist' : {
                        itemdblclick : this.editPerson
                    },

                    'personlist #addNewPerson' : {
                        click : this.addNewPerson
                    },

                    'personedit button[action=save]' : {
                        click : this.updatePerson
                    }
                }
            );
        },

        addNewPerson : function( button )
        {
            var view = Ext.widget( 'personedit' );
            var newRecord = this.getPersonsStore().add( new ContactManager.model.Person() );

            view.down( 'form' ).loadRecord( newRecord[0] );
        },

        updatePerson : function( button )
        {
            var win = button.up( 'window' );
            var form = win.down( 'form' ).getForm();
            if( form.isValid() )
            {
                var record = form.getRecord();
                var values = form.getValues();

                record.set( values );
                win.close();
                this.getPersonsStore().sync();
            }
            else
            {
                //Ext.Msg.alert( 'Sorry, but the form data is invalid.' );
            }
        },

        editPerson : function( grid, record )
        {
            var view = Ext.widget( 'personedit' );
            view.down( 'form' ).loadRecord( record );
        }
    }
);