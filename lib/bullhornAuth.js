let rp = require('request-promise');
function debug(string) {
  if(process.env.DEV) {
    // console.log(string);
  }
}

let bullhornAuth = {

  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,

  authCodeUrl: 'https://auth.bullhornstaffing.com/oauth/authorize',
  authTokenUrl: 'https://auth.bullhornstaffing.com/oauth/token',
  loginUrl: 'https://rest.bullhornstaffing.com/rest-services/login',

  authCodeParams: {
    response_type: 'code',
    action: 'Login',
    client_id: undefined,
    username: undefined,
    password: undefined
  },

  getAuthCodeParams: function(username, password) {
    var params = this.authCodeParams;
    params.username = username;
    params.password = password;
    params.client_id = this.clientId;
    return params;
  },

  getAuthCodeUrl: function(username, password) {
    var params = this.getAuthCodeParams(username, password);
    var url = new URL(this.authCodeUrl);
    var searchParams = new URLSearchParams(params);
    url.search = searchParams;
    return url.href;
  },

  const rp = require('request-promise');

async function retrieveAuthorizationCode(username, password) {

  const authParams = {
    client_id: this.clientId,
    username,
    password,
  };
  
  const authCodeResponse = await rp({
    method: 'POST',
    uri: this.authCodeUrl,
    qs: authParams,
    followRedirect: false,
    resolveWithFullResponse: true,
  });

  const code = new URL(authCodeResponse.headers.location).searchParams.get('code');

  return code;
}

async function retrieveAccessToken(code) {
  const tokenParams = {
    code,
    client_id: this.clientId,
    client_secret: this.clientSecret,
    grant_type: 'authorization_code'
  };

  const accessTokenResponse = await rp({
    method: 'POST',
    uri: this.authTokenUrl,
    json: true,
    qs: tokenParams,
  });

  const accessToken = accessTokenResponse.access_token;

  return accessToken;
}

async function retrieveLoginData(accessToken) {
  const loginParams = {
    version: '*',
    access_token: accessToken
  };

  const loginResponse = await rp({
    uri: this.loginUrl,
    json: true, 
    qs: loginParams,
  });

  return loginResponse;
}

async function authenticate(username, password) {
  try { 
      const code = await retrieveAuthorizationCode(username, password);
      const accessToken = await retrieveAccessToken(code);
      const loginData = await retrieveLoginData(accessToken);

      const restData = {
          BhRestToken: loginData.BhRestToken,
      };
      
      return restData;

  } catch (error) {
      throw new Error('Unable to login, check username and password, or click the "first login" link');
  }    
}

};

module.exports = bullhornAuth;
