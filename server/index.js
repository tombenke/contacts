var config = require('./config.js').parameters;

function index( req, res )
{
    res.render(
        'index',
        {
            title : config.appName,
            mainscript : 'app.js'
        }
    );
};

exports.index = index;