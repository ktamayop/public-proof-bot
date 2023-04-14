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

  const CLIENT_ID = 'client-id';
const CLIENT_SECRET = 'client-secret-key';
const API_VERSION = '*';
const AUTH_CODE_URL = 'auth-code-url';
const AUTH_TOKEN_URL = 'auth-token-url';
const LOGIN_URL = 'login-url';
const AUTH_GRANT_TYPE = 'authorization_code';

const getAuthCodeParams = (username, password) => {
  return {
    client_id: CLIENT_ID,
    response_type: AUTH_GRANT_TYPE,
    username: username,
    password: password
  };
};

const requestAuthCode = async (params) => {
  let options = {
    uri: AUTH_CODE_URL,
    qs: params,
    resolveWithFullResponse: true
  };

  let response = await rp(options);
  let url = new URL(response.request.uri.href);
  return url.searchParams.get('code');
};

const requestAccessToken = async (params) => {
  let options = {
    method: 'POST',
    uri: AUTH_TOKEN_URL,
    qs: params,
    json: true
  };

  return await rp(options);
};

const requestBhRestToken = async (accessToken) => {
  let params = {
    version: API_VERSION,
    access_token: accessToken
  };

  let options = {
    uri: LOGIN_URL,
    qs: params,
    json: true
  };

  return await rp(options);
};

const authenticate = async (username, password) => {
  try {
      const authCodeParams = getAuthCodeParams(username, password);
      const authCode = await requestAuthCode(authCodeParams);
      const accessTokenParams = {
        grant_type: AUTH_GRANT_TYPE,
        code: authCode,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      };
      const accessTokenResp = await requestAccessToken(accessTokenParams);
      const restTokenResp = await requestBhRestToken(accessTokenResp.access_token);
      return restTokenResp;
  } catch (error) {
      throw new Error('Authentication failed');
  }
};

};

module.exports = bullhornAuth;
