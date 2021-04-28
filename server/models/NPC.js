const mongoose = require('mongoose');

const _ = require('underscore');

let NPCModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setGender = (gender) => _.escape(gender).trim();
const setRace = (race) => _.escape(race).trim();
const setClass = (classNPC) => _.escape(classNPC).trim();
const setAlignment = (alignment) => _.escape(alignment).trim();
const setDisposition = (disposition) => _.escape(disposition).trim();

const NPCSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    set: setGender,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  race: {
    type: String,
    required: true,
    trim: true,
    set: setRace,
  },
  classNPC: {
    type: String,
    required: true,
    trim: true,
    set: setClass,
  },
  alignment: {
    type: String,
    required: true,
    trim: true,
    set: setAlignment,
  },
  level: {
    type: Number,
    min: 0,
    required: true,
  },
  disposition: {
    type: String,
    required: true,
    trim: true,
    set: setDisposition,
  },
  backstory: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

NPCSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  gender: doc.gender,
  race: doc.race,
  class: doc.class,
  alignment: doc.alignment,
  level: doc.level,
  disposition: doc.disposition,
  backstory: doc.backstory,
});

NPCSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return NPCModel.find(search).select(' _id name age gender race class alignment level disposition backstory').lean().exec(callback);
};

NPCModel = mongoose.model('NPC', NPCSchema);

module.exports.NPCModel = NPCModel;
module.exports.NPCSchema = NPCSchema;
