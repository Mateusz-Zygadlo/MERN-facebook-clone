const facebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/User');

exports.facebookAuthenticationUser = (passport, res) => {
  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['first_name', "last_name",'gender','picture','email', 'birthday']
  }, (token, refreshToken, profile, done) => {
    User.findOne({facebookId: profile._json.id}).exec((err, result) => {
      if(err){
        return {
          err: 'not working'
        }
      }
      if(result == null){
        const user = new User({
          picture: profile._json.picture.data.url,
          firstName: profile._json.first_name,
          lastName: profile._json.last_name,
          loginWithFacebook: true,
          facebookId: profile._json.id,
          password: process.env.FACEBOOK_PASSWORD,
          friends: [],
          yourInvitations: [],
          invitations: [],
        }).save((err) => {
          if(err){
            console.log(err);
          }
        })
      }

      localStorage.setItem('id', profile._json.id);

      return done(null, profile);
    })
  }));
}