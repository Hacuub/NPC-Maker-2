// const { response } = require('express');
const mongoDB = require('mongodb').MongoClient;
const mongodbID = require('mongodb');

const models = require('../models');

const dbURL = 'mongodb+srv://hacuub:Five85585@cluster0.twdhr.mongodb.net/NPCMaker?retryWrites=true&w=majority';

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);
    // const savePromise = newAccount.save();

    newAccount.save((err, doc) => {
      if (err) {
        console.log(err);

        if (err.code === 11000) {
          return res.status(400).json({ error: 'Username already in use' });
        }

        return res.status(400).json({ error: 'An error ocurred' });
      }

      req.session.account = Account.AccountModel.toAPI(doc);
      return res.json({ redirect: '/maker' });
    });

    /*
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/maker' });
    });
    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An error has occurred' });
    }); */
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

//  updates the users password
const updatePassword = (request, response) => {
  const req = request;
  const res = response;

  //  connect to mongo
  mongoDB.connect(dbURL, (err, db) => {
    if (err) {
      console.log('Could not connect to database');
      throw err;
    }

    if (req.body.pass !== req.body.pass2) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (!req.body.pass || !req.body.pass2) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const dbo = db.db('NPCMaker');
    const myquery = { _id: new mongodbID.ObjectID(req.session.account._id) };

    Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
      const newData = {
        salt,
        password: hash,
      };

      const newvalue = {
        $set: {
          salt: newData.salt,
          password: newData.password,
        },
      };
      dbo.collection('accounts').updateOne(myquery, newvalue, (err1) => {
        if (err1) {
          console.log('Could not update from database');
          throw err1;
        }
      });

      db.close();
    });
    return response.status(204).json({ message: `Updated entry with id ${req.body._id}` });
  });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.updatePassword = updatePassword;
