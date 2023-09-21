// use javascript in strict mode
"use strict";

// import all required modules
const express = require("express");
const logger = require("./utils/logger");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// initialise project
const app = express();

// static files output to public folder
app.use(express.static("public"));

// use bodyParser, cookieParser, fileUpload
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

// use handlebars as view engine
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",

    helpers: {
      uppercase: (inputString) => {
        return inputString.toUpperCase();
      },
      
      formatDate: (date) => {
        let dateCreated = new Date(date);
        let dateNum = dateCreated.getDate();
        let month = dateCreated.getMonth();
        let year = dateCreated.getFullYear();

        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let monthname = months[month];
        return `${monthname} ${dateNum}, ${year}`;
      },
      
      formatDate2: (date) => {
        let dateCreated = new Date(date);
        let dateNum = dateCreated.getDate();
        let day = dateCreated.getDay();
        let month = dateCreated.getMonth();
        let year = dateCreated.getFullYear();

        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        
        let days = [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"       
        ]
        let monthname = months[month];
        let dayname = days[day]
        return `${dayname} ${monthname} ${dateNum}, ${year}`;
      },
      populate: (genre) => {
        const genres = ["Action", "Comedy", "Romance", "Horror", "Science Fiction"];
        genres.splice(genres.indexOf(genre), 1);
        let options = ``;
        for (let item of genres) {
          options += `<option value ="${item}">${item}</option>`;
        }
        return options;
      },
      
      capitalise: (str) => {
       let words=str.split(" ")
       let formattedname=""
       words.forEach(word => formattedname+= `${word.charAt(0).toUpperCase()}${word.substring(1,).toLowerCase()} `)
       return formattedname 
    }
    }
  })
);
app.set("view engine", ".hbs");

// import routes file and use this for routing
const routes = require("./routes");
app.use("/", routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info("Your app is listening on port " + listener.address().port);
});
