/* 
 * Reads the config parameters of the application from the config.yml file.
 */

// Load the YAML parser module
require( 'js-yaml' );

// Load the YAML format config file
var configFile = require( __dirname + '/config.yml' )[0];

// Set the config parameters to the selected environment
var parameters = configFile.environments[ configFile.useEnvironment ];

// Process default values combined with the parameters of the
// selected environment
// TODO
console.log( 'config loaded:', parameters );

exports.parameters = parameters;