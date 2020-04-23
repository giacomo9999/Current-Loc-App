
Current-Loc is a lightweight API which accepts user-location webhooks and which can be queried with either a search string or a visit ID.

POST requests to Current-Loc are made by submitting a JSON of the following form: 

{
	"userId":"leonard_c",
	"name":"chelsea_hotel"	
} 

...where "userId" is the user's username and "name" is the name of the location. Current-Loc then posts to its database a JSON similar to the sample below: 

{
    "_id": "5ea1a5dad0fbb5c663589624",
    "visitId": "5275929b-720b-41a5-adb0-82f8ffa56f69",
    "visitDate": 1587652058908,
    "userId": "leonard_c",
    "name": "chelsea_hotel",
    "__v": 0
}

...where "visitId" is a unique identifier (uuid) created for each event and "visitDate" is a timestamp (created using JavaScript's Date.now() method). ("_id" and "_v" are used internally by the database and not used by Current-Loc.)

GET requests to Current-Loc can be made by submitting as query parameters either a valid "visitId" or both a valid "userId" and a search string (See below for samples). Upon receiving the request, Current-Loc attempts to match the search string with the "name" parameter in the five most recent locations with matching "userId" and returns any matching database entries. String matching is implemented using the NPM "Fuzzy Search" dependency (https://www.npmjs.com/package/fuzzy-search).

--

And that's it. The app is deployed for use at https://current-loc-app.herokuapp.com - it's on the "free" tier of Heroku, so please allow a few seconds for it to spin up. Sample requests to the GET and PUT endpoints are below...(as of 2:39PM on Thursday, these were working fine:)

https://current-loc-app.herokuapp.com/visit?visitId=b806d843-9b07-43f7-ab11-cd950af4f96d

https://current-loc-app.herokuapp.com/visit?searchString=Reis&userId=Jim_G

Thanks! Please feel free to contact me with any questions.

JG