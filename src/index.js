"use strict";
const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const routes = require("./routes");
var Path = require("path");
const fs = require("fs");
const Joi = require("joi");


const HapiCron = require('hapi-cron');




Mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = Mongoose.connection;
db.on("error", (err) => {
  console.log("PPPPPPP");
  process.exit(1);
});

db.once("open", function callback() {
  console.log("Connection with database succeeded.");
});

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // an array of origins or 'ignore'
        credentials: true, // boolean - 'Access-Control-Allow-Credentials'
      },
      files: {
        relativeTo: Path.join(__dirname, "../client/build"),
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: "Persons API Documentation",
      version: "0.0.1",
    },
  };

  await server.register([
    {
      plugin: Inert,
    },
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },

    {
      plugin: HapiCron,
      options: {
          jobs: [{
              name: 'testcron',
              time: '*/10 * * * * *',
              timezone: 'Europe/London',
              request: {
                  method: 'DELETE',
                  url: '/test-url'
              },
              onComplete: (res) => {
                  console.log(res); // 'hello world'
              }
          }]
      }
  }
  ]);

  server.route(routes);


 
  //exposing all files under build folder
  server.route({
    method: "GET",
    path: "/{path*}",
    handler: {
      directory: {
        path: ".",
      },
    },
  });

  // response for all routes using
  server.ext("onPreResponse", (req, h) => {
    console.log(req.info.referrer, req.info.hostname);
    const { response } = req;
    if (response.isBoom && response.output.statusCode === 404) {
      // console.log(response.output.statusCode,"pppp")
      return h.file("index.html");
    }
    return h.continue;
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
