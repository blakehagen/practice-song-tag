song-tag
========

A mini project to practice relationships in Mongo.

##Objectives
You'll create a simple set of schema revolving around Artists, their Songs, and a set of Tags that are associated with songs.

##Step 1: Create Schema

In server.js file, make sure you include Express and Mongoose as dependencies. Also, in server.js, initiliaze the connection to Mongo.

Here are the Mongoose models we'll create in our server.js:

####Artist
 * name (string)
 * bio (string)
 * genres (array of unique strings)

####Song
 * name (string)
 * album (string)
 * genre (string)
 * releasedOn (date)
 * isExplicit (boolean)

####Tag
 * name (string, unique)

Create each of the models listed above. Put them each in their own file in a `/lib/models` directory. Make sure you use `module.exports` so that we can `require` these models in our API.

Now, let's connect these models. 

* Use a one-to-many relationship for Artist -> Song
* Use a many-to-many relationship for Song -> Tag

This should necessitate adding fields to our models to represent these relationships:

####Artist
* songs

####Song
* artist
* tags

####Tag
* songs

##Step 2: Create API
Back in server.js, let's create the routes for our little API.

####POST /artists
Save a new artist

####GET /artists
Returns a list of artists with a `songs` attribute

Create an artist named `Nelly` with the following attributes:

```json
{
  "name": "Nelly",
  "bio": "Cornell Iral Haynes, Jr., better known by his stage name, Nelly, is an American rapper, singer, songwriter, entrepreneur, investor and occasional actor from St. Louis, Missouri",
  "genres": ["hip hop","pop","R&B"]
}
```

####GET /artists/:id
Returns the specified artist

####POST /artists/:id/songs
Adds a new song for the given artist

Create a song for Nelly with the following attributes:

```json
{
  "name": "Ride wit me", 
  "album": "Country Grammar", 
  "genre": "pop", 
  "releasedOn": "4-1-2001", 
  "isExplicit": false
}
```


When you're finished, a GET to `/artists/:id` for Nelly should return something like this:

```json
[
  {
    "_id": "...",
    "name": "Nelly",
    "bio": "Cornell Iral Haynes, Jr., better known by his stage name, Nelly, is an American rapper, singer, songwriter, entrepreneur, investor and occasional actor from St. Louis, Missouri",
    "songs": [
      {
        "name": "Ride wit me", 
        "album": "Country Grammar", 
        "genre": "pop", 
        "releasedOn": "4-1-2001", 
        "isExplicit": false
      }
    ],
    "genres": ["hip hop","pop","R&B"]
  }
]
```

####GET /song/:id
Returns song with associated tags

####POST /song/:id/tags
Creates a tag (if it doesn't already exist) and associate it with the given song.

Now test your app by POSTing some tags to "Ride wit me."