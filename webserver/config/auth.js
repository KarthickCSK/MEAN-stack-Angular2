module.exports = {
  JWT: {
          secret: 'e3rwefsd'
  },
  FACEBOOK: {
      clientID: '697269667129714',
      clientSecret: 'f5c1937c8221aad37b7d8eb069f1135a',
      callbackURL: 'http://localhost:4200/auth/facebook/callback',
      profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      profileFields:   ['id','displayName','photos','gender','profileUrl','email']
  },
  GOOGLE: {
          clientID: '252912608151-l1r1ajqk9e7vclbc8rbomu81dvuklj9g.apps.googleusercontent.com ',
          clientSecret: ' BN3fhKU1NTyvrMhhSIiYCef5 ',
          callbackURL: 'http://localhost:4200/auth/google/callback',
          profileFields:   ['id','displayName','photos','gender','profileUrl','email']
      }
};
