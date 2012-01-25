#!/bin/bash
#
# Creates a backup snapshot of the 'database' in a format,
# that can directly be used for bulk upload during restore.
# Can be used also for restoring into a new database.
#
# author: Tamás Benke
#

unset http_proxy
unset https_proxy

declare -rx scriptDescription="Utility to make a backup of a CouchDb database"
declare -rx SCRIPT=${0##*/}                     # SCRIPT is the name of this script

declare -x  backupfile="backup.json"
declare -x  database="contacts"
declare -x  backup=0
declare -x  restore=0

# prod settings
declare -rx prod_username=admin
declare -rx prod_password=admin
declare -rx prod_host=localhost:5984

# demo settings
declare -rx demo_username=admin
declare -rx demo_password=admin
declare -rx demo_host=localhost:5984

# test settings
declare -rx test_username=admin
declare -rx test_password=admin
declare -rx test_host=localhost:5984

# local settings
declare -rx local_username=admin
declare -rx local_password=admin
declare -rx local_host=localhost:5984

# Default settings for target URL
targeturl=http://${local_username}:${local_password}@${local_host}

# Make sure there is at least one parameter or accessing $1 later will be an error.
if [ $# -eq 0 ] ; then
   printf "%s\n" "Type --help for help."
   exit 192
fi

# Process the parameters
# Analyze the following parameters
while [ $# -gt 0 ] ; do
    # The parameter is the name of the environment to upload the data
    case $1 in
    "prod")
        declare -rx systemName="productive"
        targeturl=http://${prod_username}:${prod_password}@${prod_host};;

    "demo")
        declare -rx systemName="demonstration"
        targeturl=http://${demo_username}:${demo_password}@${demo_host};;

    "test")
        declare -rx systemName="test"
        targeturl=http://${test_username}:${test_password}@${test_host};;

    "local")
        declare -rx systemName="local"
        targeturl=http://${local_username}:${local_password}@${local_host};;

    -h | --help) # Show help
        printf "%s\n" \
            "Usage: " \
            "$SCRIPT ENV [OPTION]..." \
            "$scriptDescription" \
            "" \
            "Options:" \
            "   [-h][--help]    : Show this help and exit" \
            "   [-b][--backup]  : Backup the whole database in bulk format" \
            "   [-r][--restore] : Restore the selected bulk datafile" \
            ""
        exit 0
        ;;

    -b | --backup )
    	backup=1
        echo "Going to backup"
        ;;

    -r | --restore )
    	restore=1
        echo "Going to restore"
        ;;

    -* ) # Unsupported switch
        printf  "$SCRIPT:$LINENO: %s\n" \
                "switch $1 not supported" >&2
        exit 192
        ;;

     * ) # Extra argument of missing switch
#        printf  "$SCRIPT:$LINENO: %s\n" \
#                "extra argument or missing switch: $1" >&2
#        exit 192
        backupfile=$1
        echo "set backupfile to ${backupfile}"
        ;;
    esac
    shift
done

# Upload datafiles to the server
if [ $backup -eq 1 ] ; then

    echo "Store the ${database} database the ${backupfile} file"
    dburl=${targeturl}/${database}

    echo "$dburl/_design/main/_list/backup/docsByType"
    curl -X GET "$dburl/_design/main/_list/backup/docsByType" > ${backupfile}
fi

# Upload datafiles to the server
if [ $restore -eq 1 ] ; then

    echo "Upload the ${backupfile} file into the ${database} database"
    dburl=${targeturl}/${database}

    echo "Delete the whole database"
    curl -X DELETE $dburl

    echo "Create an empty database"
    curl -X PUT $dburl

    echo "Uploading ${backupfile} to $dburl/_bulk_docs"
    curl -X POST \
         -d @${backupfile} \
         -H "Content-type: application/json" \
         $dburl/_bulk_docs

    echo "Deploy design documents"
    couchapp push _design/main default
fi
