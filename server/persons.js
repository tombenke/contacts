var db = require( 'cdb' );


function getExt( request, response )
{
    db.getViewExt( 'main/persons', response );
};

function getLocalExt( request, response )
{
    db.getViewExt( 'main/localPersons', response );
};

function getNonLocalExt( request, response )
{
    db.getViewExt( 'main/nonLocalPersons', response );
};

function postExt( request, response )
{
    db.postDocExt( request, response, updateDoc );
};

function deleteExt( request, response )
{
    db.deleteDocExt( request, response );
};

function get( request, response )
{
    db.getView( 'main/persons', response );
};

function getCsv( request, response )
{
    db.getViewCsv( 'main/persons', response );
};

function post( request, response )
{
    db.postDoc( request, response, updateDoc );
};

function updateDoc( request, useDocTemplate )
{
    var doc = {};

    if( useDocTemplate )
    {
        doc = {
            type: 'person',
            lastUpdate: new Date(),
            sex: "",
            familyName: "",
            surName: "",
            isLocal: false,
            company: "",
            orgUnit: "",
            email: "",
            mobile: "",
            phone: "",
            fax: "",
            web:"",
            comment: ""
        };
    }
    else
    {
        if( request.body._oldValues )
        {
            doc = JSON.parse( request.body._oldValues ).doc;
        }
    }

//    console.log( 'request.body:\n', request.body );
//    console.log( 'useDocTemplate:\n', useDocTemplate );
//    console.log( 'doc:\n', doc );

    // Update the document
    doc._id = request.body._id;
    doc._rev = request.body._rev;
    doc.type = "person";
    doc.sex = request.body.sex || "";
    doc.familyName = request.body.familyName || "";
    doc.surName = request.body.surName || "";
    doc.isLocal = request.body.isLocal || "";
    doc.company = request.body.company || "";
    doc.orgUnit = request.body.orgUnit || "";
    doc.email = request.body.email || "";
    doc.mobile = request.body.mobile || "";
    doc.phone = request.body.phone || "";
    doc.fax = request.body.fax || "";
    doc.web = request.body.web || "";
    doc.comment = request.body.comment || "";
    doc.lastUpdate = new Date();
    return doc;
}

exports.get = get;
exports.getCsv = getCsv;
exports.post = post;
exports.getExt = getExt;
exports.getLocalExt = getLocalExt;
exports.getNonLocalExt = getNonLocalExt;
exports.postExt = postExt;
exports.deleteExt = deleteExt;
