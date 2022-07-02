import { checkLineLoginConfig, } from '../utils/line.js'
import { httpGet, httpPost, } from '../utils/http.js'
import {
  LINE_LOGIN_ENDPOINT,
  LINE_API_ENDPOINT,
  LINE_API_ACCESS_TOKEN,
  LINE_API_VERIFY_TOKEN,
  LINE_API_REVOKE_TOKEN,
  LINE_API_USERINFO,
  LINE_API_PROFILE,
  LINE_API_FRIEND_SHIP_STATUS,
  LINE_VERIFY_IDTOKEN_ERROR_MESSAGE,
} from '../constants'

function createLineLoginURL(config: MAIN.LineLoginUrl): string {
  if (!checkLineLoginConfig(config)) {
    throw new Error('the required config value less than default required')
  }

  const searchParams = Object.keys(config).reduce((acc, key) => acc += `${key}=${config[key]}&`, 'response_type=code&')
  const url = new URL(LINE_LOGIN_ENDPOINT);
  const query = new URLSearchParams(searchParams);
  url.search = query.toString()

  return url.href
}

async function getAccessToken({
  code,
  clientId,
  clientSecret,
  redirectUri,
  codeVerifier
}: MAIN.AccessToken): Promise<[LINE.AccessToken, LINE.ErrorResponse]> {
  if (!code || !clientId || !redirectUri! || !clientSecret) {
    throw new Error("Required code or clientId or redirectUri for getAccessToken")
  }

  let data = `grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`;

  if (codeVerifier) {
    data += `&code_verifier=${codeVerifier}`
  }

  try {
    const resp = await httpPost({
      url: `${LINE_API_ENDPOINT}/${LINE_API_ACCESS_TOKEN}`,
      data,
    }) as LINE.AccessToken;

    return [resp, null];
  } catch (err) {
    const error = {
      error: err?.error,
      message: err?.error_description
    }
    return [null, error]
  }
}

async function verifyAccessToken(
  accessToken: string
): Promise<[LINE.VerifyToken, LINE.ErrorResponse]> {
  if (!accessToken) {
    throw new Error("Required accessToken for verify access token")
  }

  try {
    const resp = await httpGet({
      url: `${LINE_API_ENDPOINT}/${LINE_API_VERIFY_TOKEN}`,
    }) as LINE.VerifyToken;

    return [resp, null];
  } catch (err) {
    const error = {
      error: err?.error,
      message: err?.error_description
    }
    return [null, error];
  }
}

async function verifyIdToken({
  idToken,
  clientId,
  nonce,
  userId
}: MAIN.VerifyIdToken): Promise<[LINE.VerifyIdToken, LINE.ErrorResponse]> {
  if (!idToken || !clientId) {
    throw new Error("Required idToken and clientId for verify id token")
  }

  let data = `id_token=${idToken}&client_id=${clientId}`

  if (nonce) data += `&nonce=${nonce}`

  if (userId) data += `&user_id=${userId}`

  try {
    const resp = await httpPost({
      url: `${LINE_API_ENDPOINT}/${LINE_API_VERIFY_TOKEN}`,
      data
    }) as LINE.VerifyIdToken;

    return [resp, null];
  } catch (err) {
    const errorDescription = err?.error_description.replace(' ', '')
    const error = {
      error: err?.error,
      message: LINE_VERIFY_IDTOKEN_ERROR_MESSAGE[errorDescription]
    }
    return [null, error];
  }
}

async function refreshAccessToken({
  refreshToken,
  clientId,
  clientSecret
}: MAIN.RefreshAccessToken): Promise<[LINE.RefreshToken, LINE.ErrorResponse]> {
  if (!refreshToken || !clientId || !clientSecret) {
    throw new Error("Required refreshToken or clientId or clientSecret for refresh new token")
  }

  const data = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`

  try {
    const resp = await httpPost({
      url: `${LINE_API_ENDPOINT}/${LINE_API_ACCESS_TOKEN}`,
      data
    }) as LINE.RefreshToken;

    return [resp, null];
  } catch (err) {
    const error = {
      error: err?.error,
      message: err?.error_description
    }
    return [null, error];
  }
}

async function revokeAccessToken({
  accessToken,
  clientId,
  clientSecret
}: MAIN.RevokeAccessToken): Promise<[LINE.RevokeToken, LINE.ErrorResponse]> {
  if (!accessToken || !clientId || !clientSecret) {
    throw new Error("Required accessToken or clientId or clientSecret for revoke accessToken")
  }

  const data = `client_id=${clientId}&client_secret=${clientSecret}&access_token=${accessToken}`

  try {
    const resp = await httpPost({
      url: `${LINE_API_ENDPOINT}/${LINE_API_REVOKE_TOKEN}`,
      data
    }) as LINE.RevokeToken;

    return [resp, null];
  } catch (err) {
    const error = {
      error: err?.error,
      message: err?.error_description
    }
    return [null, error];
  }
}

async function getUserInfo(
  accessToken: string
): Promise<[LINE.UserInfo, LINE.ErrorResponse]> {
  if (!accessToken) {
    throw new Error("Required accessToken to get user infomation")
  }

  try {
    const resp = await httpGet({
      url: `${LINE_API_ENDPOINT}/${LINE_API_USERINFO}`,
      customConfig: {
        Authorization: `Bearer ${accessToken}`
      }
    }) as LINE.UserInfo;

    return [resp, null];
  } catch (err) {
    const error = {
      error: err?.error,
      message: err?.error_description
    }
    return [null, error];
  }
}

async function getUserProfile(
  accessToken: string
): Promise<[LINE.UserProfile, LINE.ErrorResponse]> {
  if (!accessToken) {
    throw new Error("Required accessToken to get user profile")
  }

  try {
    const resp = await httpGet({
      url: `${LINE_API_ENDPOINT}/${LINE_API_PROFILE}`,
      customConfig: {
        Authorization: `Bearer ${accessToken}`
      }
    }) as LINE.UserProfile;

    return [resp, null];
  } catch (err) {
    const error = {
      error: err?.error,
      message: err?.error_description
    }
    return [null, error];
  }
}

async function getFriendshipStatus(
  accessToken: string
): Promise<[Boolean, LINE.ErrorResponse]> {
  if (!accessToken) {
    throw new Error("Required accessToken to get is friend status flag")
  }

  try {
    const resp = await httpGet({
      url: `${LINE_API_ENDPOINT}/${LINE_API_FRIEND_SHIP_STATUS}`,
      customConfig: {
        Authorization: `Bearer ${accessToken}`
      }
    }) as LINE.FriendShipStatus;

    return [resp.friendFlag, null];
  } catch (err) {
    const error = {
      error: err?.error,
      message: err?.error_description
    }
    return [null, error];
  }
}

export default {
  createLineLoginURL,
  getAccessToken,
  verifyAccessToken,
  verifyIdToken,
  refreshAccessToken,
  revokeAccessToken,
  getUserInfo,
  getUserProfile,
  getFriendshipStatus,
}