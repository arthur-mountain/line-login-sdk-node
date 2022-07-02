/*----------------------  line login ------------------------------- */
export const LINE_LOGIN_ENDPOINT = 'https://access.line.me/oauth2/v2.1/authorize'

/*----------------------  line api path ------------------------------- */
export const LINE_API_ENDPOINT = 'https://api.line.me'

export const LINE_API_ACCESS_TOKEN = 'oauth2/v2.1/token'
export const LINE_API_VERIFY_TOKEN = 'oauth2/v2.1/verify'
export const LINE_API_REVOKE_TOKEN = 'oauth2/v2.1/revoke'
export const LINE_API_USERINFO = 'oauth2/v2.1/userinfo'
export const LINE_API_PROFILE = 'oauth2/v2.1/profile'
export const LINE_API_FRIEND_SHIP_STATUS = 'friendship/v1/status'

/*----------------------  error ------------------------------- */
export const LINE_VERIFY_IDTOKEN_ERROR_MESSAGE = {
  InvalidIdToken: 'The ID token is malformed or the signature is invalid',
  InvalidIdTokenIssuer: 'The ID token was not be generated on line.',
  IdTokenexpired: 'The ID token has expired.',
  InvalidIdTokenAudience: 'The ID token`s Audience value is different from the channel',
  InvalidIdTokenNonce: 'The ID token`s Nonce value is different from the channel',
  InvalidIdTokenSubjectIdentifier: 'The ID token`s SubjectIdentifier value is different from the user',
}