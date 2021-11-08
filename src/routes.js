const Joi = require("joi");
const PersonModel = require("./model/person");
const personSchema = require("./validation/person");
const HistoryModel = require("./model/history");
const fs = require("fs");

var moment = require("moment");

module.exports = [
  {
    method: ["GET", "POST"],
    path: "/",
    options: {
      description: "Test Route",
      notes: "Returns a string",
      tags: ["api"],
      handler: function (request, h) {
        return "I did something!";
      },
    },
  },
  {
    method: "POST",
    path: "/h",
    handler: function (request, h) {
      console.log(request.payload);
      return `Hello `;
    },
    options: {
      description: "payload  test",
      notes: "Return static string",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          post: Joi.string().min(100).max(140),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/person",
    options: {
      description: "Person Entry Request",
      notes: "Returns an array of Person",
      tags: ["api"],
      validate: {
        payload: personSchema.personValidateSchema,
      },
      handler: async (request, h) => {
        try {
          var person = new PersonModel(request.payload);
          var result = await person.save();
          console.log(result);
          return h.response(result);
        } catch (error) {
          return h.response(error).code(500);
        }
      },
    },
  },

  {
    method: "GET",
    path: "/people",
    options: {
      description: "Get persons list",
      notes: "Returns an array of persons",
      tags: ["api"],

      handler: async (request, replay) => {
        try {
          var persons = await PersonModel.find().exec();
          return replay.response(persons);
        } catch (error) {
          return replay.response(error).code(500);
        }
      },
    },
  },

  {
    method: "GET",
    path: "/person/{id}",
    options: {
      description: "Get persons information",
      notes: "Returns an array of persons",
      tags: ["api"],
      validate: {
        params: Joi.object({
          file: Joi.any().meta({ swaggerType: "file" }).description("file"),
        }),
      },
      handler: async (req, rep) => {
        try {
          let person = await PersonModel.findById(req.params.id).exec();
          return rep.response(person);
        } catch (error) {
          return rep.response(error).code(500);
        }
      },
    },
  },
  {
    method: "DELETE",
    path: "/person/{id}",
    options: {
      description: "delete a person",
      notes: "Returns an array of persons",
      tags: ["api"],
      validate: {
        params: personSchema.personValidateId,
      },
      handler: async (req, rep) => {
        try {
          let result = await PersonModel.findByIdAndDelete(req.params.id);
          return rep.response(result);
        } catch (error) {
          return rep.response(error).code(500);
        }
      },
    },
  },

  {
    method: "POST",
    path: "/upload",
    handler: (request, h) => {
      const data = request.payload;
      if (data.file) {
        console.log(data.file._data.toString());
      }
      return data.file._data.toString();
    },
    options: {
      payload: {
        maxBytes: 1000 * 1000 * 20, // 20 Mb
        output: "stream",
        parse: true,
        multipart: true,
        // allow: 'multipart/form-data'
      },
      description: "Create a Configuration",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          file: Joi.any()
            .meta({ swaggerType: "file" })
            .required()
            .description("Image File"),
        }),
      },

      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
    },
  },

  {
    method: "PUT",
    path: "/person/{id}",
    options: {
      validate: {
        payload: personSchema.personUpdateValidate,
      },
    },
    handler: async (request, h) => {
      try {
        let person = await PersonModel.findById(request.params.id).exec();
        const { _id, ...newResponse } = person._doc;
        let history = new HistoryModel(newResponse);
        let result = await history.save();

        let updatedContet = { ...request.payload, updated: Date.now() };
        result = await PersonModel.findByIdAndUpdate(
          request.params.id,
          updatedContet,
          { new: true }
        );
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },

  {
    method: "DELETE",
    path: "/test-url",
    options: {
      handler: async (req, rep) => {
        try {
          let older_than = moment().subtract(30, "days").toDate();
          let persons = await HistoryModel.find(
            { created: { $lte: older_than } },
            null,
            { skip: 5, sort: { _id: -1 } },

            function (err, results) {
              results.forEach(function (doc) {
                doc.remove();
              });
            }
          );

          console.log(older_than, "older_than");
          return persons;
        } catch (error) {
          return rep.response(error).code(500);
        }
      },
    },
  },
];
