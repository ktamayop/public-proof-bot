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

  authenticate: async function(username, password) {

  const getAuthCodeParams = async function(username, password) {
    return {
      username,
      password,
      client_id: this.clientId,
      client_secret: this.clientSecret
    };
  };

  const getAccessToken = async function(code) {
    const options = {
      method: 'POST',
      uri: this.authTokenUrl,
      qs: {
        grant_type: 'authorization_code',
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret
      },
      json: true
    };
    const { access_token } = await rp(options);
    debug(`Received access token ${access_token} for user ${username}`);
    return access_token;
  };

  const getRestData = async function(accessToken) {
    const options = {
      uri: this.loginUrl,
      qs: {
        version: '*',
        access_token: accessToken
      },
      json: true
    };
    const restData = await rp(options);
    debug(`Received BhRestToken ${restData.BhRestToken} for user ${username}`);
    return restData;
  };

  try {
    debug(`Authenticating for ${username}`);

    const authCodeParams = await getAuthCodeParams.call(this, username, password);
    const options = {
      uri: this.authCodeUrl,
      qs: authCodeParams,
      resolveWithFullResponse: true
    };

    const { request: { uri: { href: redirectUrl } } } = await rp(options);
    const code = new URL(redirectUrl).searchParams.get('code');
    const accessToken = await getAccessToken.call(this, code);
    const restData = await getRestData.call(this, accessToken)

    return restData;
  } catch (err) {
    debug(err.message);
    throw new Error(`Unable to login, check username and password for user ${username}`);
  }
}

};

module.exports = bullhornAuth;
