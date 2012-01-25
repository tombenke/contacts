#!/bin/sh

## Save cookies to the "cookies.txt" file
## Assumes the web service expects username
## and password in a JSON object, submitted via POST.
curl --cookie-jar cookies.txt -H "Content-Type: application/json" -X POST http://localhost:3001/login -d "{\"username\": \"tombenke\", \"password\": \"malacka\"}"

## Now to use the authenticated session:
## (Assuming your web service speaks JSON)
curl --cookie cookies.txt -X GET http://localhost:3001/opportunitiesExt

rm cookies.txt
