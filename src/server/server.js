'use strict';
const dotenv = require('dotenv');
const Hapi = require("@hapi/hapi");
const Joi = require("joi");
const Mongoose = require("mongoose");

dotenv.config({path: './src/environments/.env'});
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.eigx3.mongodb.net/Cluster0?retryWrites=true&w=majority`

const server = new Hapi.Server({
    "host": "localhost",
    "port": 3000,
    "routes": {
        "cors": true
    }
});


Mongoose.connect(url);

const BikeModel = Mongoose.model("bike", {
    name: String,
    parts: [Number],
    imgUrls: [String],
    storeId: Number
});

const PartModel = Mongoose.model("part", {
    name: String,
    compatibleBikes: [Number],
    imgUrls: [String],
    description: String,
    storeId: Number
});

// Bikes 
server.route({
    method: "POST",
    path: "/bike",
    options: {
        validate:{
            payload: Joi.object({
                name: Joi.string().required(),
                parts: Joi.array().items(Joi.number()).required(),
                imgUrls: Joi.array().items(Joi.string()).required(),
                storeId: Joi.number().required()
            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        }
    },
    handler: async (request, h) => {
        try{
            var bike = new BikeModel(request.payload);
            var result = await bike.save();
            return h.response(result);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

server.route({
    method: "GET",
    path: "/bikes",
    handler: async (request, h) => {
        try{
            var bikes = await BikeModel.find().exec();
            return h.response(bikes);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

server.route({
    method: "GET",
    path: "/bike",
    handler: async (request, h) => {
        try{
            var bike;
            if(request.query.name){
                bike = await BikeModel.find({name: {$regex: `${request.query.name}`, $options: 'i'}}).exec();
            }else if(request.query.storeId){
                if(request.query.storeId.length){
                    bike = await BikeModel.find({storeId: {$in: request.query.storeId}}).exec();
                }else{
                    bike = await BikeModel.find({storeId: {$eq: request.query.storeId}}).exec();
                }
            }
            return h.response(bike);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

server.route({
    method: "PUT",
    path: "/bike",
    options: {
        validate:{
            payload: Joi.object({
                name: Joi.string().optional(),
                parts: Joi.array().items(Joi.number()).optional(),
                imgUrls: Joi.array().items(Joi.string()).optional(),
                storeId: Joi.number().optional()
            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        }
    },
    handler: async (request, h) => {
        try{
            var bike;
            if(request.query.storeId){
                bike = await BikeModel.findOneAndUpdate({storeId: {$eq: request.query.storeId}}, request.payload, {new: true}).exec();
            }
            return h.response(bike);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

server.route({
    method: "DELETE",
    path: "/bike/{id}",
    handler: async (request, h) => {
        try{
            var result = await BikeModel.findByIdAndDelete(request.params.id);
            return h.response(result);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

// PARTS

server.route({
    method: "POST",
    path: "/part",
    options: {
        validate:{
            payload: Joi.object({
                name: Joi.string().required(),
                compatibleBikes: Joi.array().items(Joi.number()).required(),
                imgUrls: Joi.array().items(Joi.string()).required(),
                description: Joi.string().required(),
                storeId: Joi.number().required()
            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        }
    },
    handler: async (request, h) => {
        try{
            var part = new PartModel(request.payload);
            var result = await part.save();
            return h.response(result);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

server.route({
    method: "GET",
    path: "/parts",
    handler: async (request, h) => {
        try{
            var parts = await PartModel.find().exec();
            return h.response(parts);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

server.route({
    method: "GET",
    path: "/part",
    handler: async (request, h) => {
        var part;
        try{
            if(request.query.name){
                part = await PartModel.find({name: {$regex: `${request.query.name}`, $options: 'i'}}).exec();
            } else if(request.query.storeId){
                if(request.query.storeId.length){
                    part = await PartModel.find({storeId: {$in: request.query.storeId}}).exec();
                }else{
                    part = await PartModel.find({storeId: {$eq: request.query.storeId}}).exec();
                }
            }
            return h.response(part);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});

server.route({
    method: "DELETE",
    path: "/part/{id}",
    handler: async (request, h) => {
        try{
            var result = await PartModel.findByIdAndDelete(request.params.id);
            return h.response(result);
        }catch(err){
            return h.response(error).code(500);
        }
    }
});


server.start();