require("dotenv").config();

var request = require("request");

var keys = require("./keys.js");

var liriCommand = process.argv[2];


// Twitter: takes in "my-tweets" - shows last 20 tweets and when they were created.

var theTwitter = function () {

  // This loads the npm twitter module
  var Twitter = require('twitter');

  // Bring in Twitter keys to access API
  var client = new Twitter(keys.twitter);

  // Parameters for Twitter API request
  var paramaters = { screen_name: 'realDonaldTrump' };

  // GET request for for user statuses
  client.get('statuses/user_timeline', paramaters, function (error, tweets, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("\r\n" + "Last 20 tweets:" + "\r\n");
      for (var i = 0; i < tweets.length; i++) {
        console.log((i + 1) + ". " + tweets[i].text);
        console.log("Created:  " + tweets[i].created_at + "\r\n");
      }
    }
  });
}

// Spotify: takes in "spotify-this-song'<song name here>'" - shows artist, song name, preview link and album song is from

function theSpotify(songName) {

  // This loads the nmp spotify module
  var Spotify = require('node-spotify-api');

  // Brings in Spotify keys to access API
  var spotify = new Spotify(keys.spotify);

  var songName = process.argv[3];

  // default song
  if (!songName) {
    songName = "The sign ace of base";
  }

  // retrives spotify data and displays it
  spotify.search({ type: 'track', query: songName }, function (error, data) {
    if (error) {
      console.log(error);
    } else {
      for (var i = 0; i < 1; i++) {

        console.log("\r\n" + "Artist:  " + data.tracks.items[0].artists[i].name);
        console.log("Song:    " + data.tracks.items[i].name);
        console.log("Album:   " + data.tracks.items[i].album.name);
        console.log("Preview: " + data.tracks.items[i].preview_url);

      }

    }
  });
}

// OMDB: takes in "movie-this '<movie name here>'" - shows title, year, imdb rating, rotten tomatoes rating, country, language, plot and actors.

function theOMDB(movie) {

  var movie = process.argv[3];

  // for (var i = 2; i < nodeArgs.length; i++) {
  //   if (i > 2 && i < nodeArgs.length) {
  //     movieName = movieName + "+" + nodeArgs[i];
  //   }
  //   else {
  //     movieName += nodeArgs[i];
  //   }
  // }

  // Default Movie
  if (!movie) {
    movie = "mr nobody";
  }

  // Accesses OMDB API through request
  // Only accepts movies with single word :(
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site 
      console.log("\r\n" + "Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB: " + JSON.parse(body).imdbRating);
      console.log("RT: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

// Spotify: takes in "do-what-it-says" - runs the text inside of random.txt and uses it to call one of liri commands.

function liriListens() {

  var fs = require('fs');

  fs.readFile("./random.txt", "utf8", function (error, data) {

    ;
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Splits the data by commas and stores it in dataArr
    var dataArr = data.split(",");

    // Stores the split data into seperate variables
    // var fileCommand = dataArr[0];
    // var fileInput = dataArr[1].trim();
    // console.log(fileInput)

    // var songName = process.argv[3];
    // songName == fileInput;


    // Runs a function based on file text
    // Couldn't get the functions to run with the paramater from the file
    if (dataArr[0] === "spotify-this-song") {
      
      theSpotify(dataArr[1])
    }

    if (dataArr[2] === "movie-this") {

      theOMDB(dataArr[3])
    }
  
  });
  

}

// Log data to a .txt file called "log.txt" - appends it

// Liri runs a function based on specific user input

if (liriCommand === "my-tweets") {

  theTwitter();

  } else if (liriCommand === "spotify-this-song") {

  theSpotify();

  } else if (liriCommand === "movie-this") {

  theOMDB();

  } else if (liriCommand === "do-what-it-says") {

  liriListens();

}

else {

  console.log("Not a command silly!")

}



