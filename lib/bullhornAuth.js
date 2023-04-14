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

  async function authenticate(username, password) {
  try {
    const authParams = getAuthCodeParams(username, password);
    const authOpts = {
      uri: authCodeUrl,
      qs: authParams,
      resolveWithFullResponse: true
    };
    const authResp = await rp(authOpts);
    const url = new URL(authResp.request.uri.href);
    const code = url.searchParams.get('code');
    const tokenParams = {
      grant_type: 'authorization_code',
      code: code,
      client_id: clientId,
      client_secret: clientSecret
    };
    const tokenOpts = {
      method: 'POST',
      uri: authTokenUrl,
      qs: tokenParams,
      json: true
    };
    const tokenResp = await rp(tokenOpts);
    const bhRestOpts = {
      uri: loginUrl,
      qs: {
        version: '*',
        access_token: tokenResp.access_token
      },
      json: true
    };
    const bhRestResp = await rp(bhRestOpts);

    debug(`User ${username} authenticated successfully`);

    return bhRestResp;
  } catch (err) {
    debug(`Error authenticating user ${username}: ${err.message}`);
    throw new Error("Unable to login, please check your username and password, or click the \"first login\" link");
  }
}

};

module.exports = bullhornAuth;
