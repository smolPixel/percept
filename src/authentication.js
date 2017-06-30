const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const oauth2 = require('feathers-authentication-oauth2');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

//TODO: configure auth the right way!

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  //authentication(config) wasnt working
  app.configure(authentication({secret:'ffff'}));
  app.configure(jwt());
  //app.configure(config.local(config.local)) wasnt working
  app.configure(local);

//{, config.google wasnt working
  app.configure(oauth2(Object.assign({
    name: 'google',
    clientID: '1234',
    clientSecret: '1234',
    Strategy: GoogleStrategy
  })));

//}, config.facebook wasnt working
  app.configure(oauth2(Object.assign({
    name: 'facebook',
    clientID: '1234',
    clientSecret: '1234',
    Strategy: FacebookStrategy
  })));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(['local'])
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after:{
      create:[
        function(hook){
          var test = 'test';
        }
      ]
    }
  });
};
