const controllers = require('./controllers');
const mid = require('./middleware');

//  sets up all of the endpoints
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.NPC.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.NPC.make);

  app.get('/getNPCs', mid.requiresLogin, controllers.NPC.getNPCs);
  app.delete('/delete', mid.requiresSecure, controllers.NPC.deleteNPC);

  app.post('/account', mid.requiresLogin, controllers.Account.updatePassword);


  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
