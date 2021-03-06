const mongoDB = require('mongodb').MongoClient;
const mongodbID = require('mongodb');
const models = require('../models');

const dbURL = 'mongodb+srv://hacuub:Five85585@cluster0.twdhr.mongodb.net/NPCMaker?retryWrites=true&w=majority';


const { NPC } = models;

const makerPage = (req, res) => {
  NPC.NPCModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), NPCs: docs });
  });
};

const makeNPC = (req, res) => {
  //  validates npc data
  if (!req.body.name || !req.body.gender || !req.body.age || !req.body.race || !req.body.classNPC
    || !req.body.alignment || !req.body.level || !req.body.disposition || !req.body.backstory) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  //  stores all npc data
  const NPCData = {
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    race: req.body.race,
    classNPC: req.body.classNPC,
    alignment: req.body.alignment,
    level: req.body.level,
    disposition: req.body.disposition,
    backstory: req.body.backstory,
    owner: req.session.account._id,
  };

  //  creates new npc
  const newNPC = new NPC.NPCModel(NPCData);

  const npcPromise = newNPC.save();

  npcPromise.then(() => res.json({ redirect: '/maker' }));

  //  checks if npc is valid
  npcPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'NPC already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return npcPromise;
};

//  deletes npc from database
const deleteNPC = (req, res) => {
  //  connects to mongo
  mongoDB.connect(dbURL, (err, db) => {
    if (err) {
      console.log('Could not connect to database');
      throw err;
    }

    const dbo = db.db('NPCMaker');
    //  deletes npc based on passed in id
    const query = { _id: new mongodbID.ObjectID(req.body._id) };
    dbo.collection('npcs').deleteOne(query, (err1) => {
      if (err1) {
        console.log('Could not delete from database');
        throw err1;
      }
      db.close();
      return res.status(204).json({ message: `Deleted entry with id ${req.body._id}` });
    });
  });
};

const getNPCs = (request, response) => {
  const req = request;
  const res = response;

  return NPC.NPCModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ NPCs: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getNPCs = getNPCs;
module.exports.make = makeNPC;
module.exports.deleteNPC = deleteNPC;
