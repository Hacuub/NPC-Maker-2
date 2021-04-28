const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getNPCs', mid.requresLogin, controllers.NPC.getNPCs);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requresLogin, controllers.Account.logout);
  app.get('/maker', mid.requresLogin, controllers.NPC.makerPage);
  app.post('/maker', mid.requresLogin, controllers.NPC.make);
  app.delete('/delete', mid.requiresSecure, controllers.NPC.deleteNPC);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
