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
const debug = require('debug')('auth');

const clientId = 'client_id_here';
const clientSecret = 'client_secret_here';
const websiteUrl = 'https://website.com';

async function authenticate(username, password) {
  const authCodeParams = new URL(`${websiteUrl}/?response_type=code&username=${username}&password=${password}`);
  const authCodeResult = await rp(authCodeParams.href);
  const authCode = new URL(authCodeResult.request.uri.href).searchParams.get('code');
  debug(`Received auth code: ${authCode} for user ${username}`);

  const accessTokenParams = `${websiteUrl}/oauth2/token?code=${authCode}&grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}`;
  const { access_token } = await rp.post(accessTokenParams);
  debug(`Received access token: ${access_token} for user ${username}`);

  const restApiParams = `${websiteUrl}/rest/of/api?version=*&access_token=${access_token}`;
  const { BhRestToken } = await rp(restApiParams);
  debug(`Received rest data: ${BhRestToken} for user ${username}`);
  return BhRestToken;
}

module.exports = authenticate;

};

module.exports = bullhornAuth;
