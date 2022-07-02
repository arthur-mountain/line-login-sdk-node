import { checkLineLoginConfig, } from '../utils/line.js'
import { httpPost, } from '../utils/http.js'
import {
  LINE_LOGIN_ENDPOINT,
  LINE_API_ENDPOINT,
  LINE_API_ACCESS_TOKEN,
} from '../constants'

function createLineLoginURL(config: Main.LineLoginUrl): string {
  if (!checkLineLoginConfig(config)) {
    throw new Error('the required config value less than default required')
  }

  const searchParams = Object.keys(config).reduce((acc, key) => acc += `${key}=${config[key]}&`, 'response_type=code&')
  const url = new URL(LINE_LOGIN_ENDPOINT);
  const query = new URLSearchParams(searchParams);
  url.search = query.toString()

  return url.href
}

async function getAccessToken({ code, client_id, redirect_uri }: Main.AccessToken): Promise<[LINE.AccessToken, Error]> {
  const data = `grant_type=authorization_code&client_id=${client_id}&code=${code}&redirect_uri=${redirect_uri}`;

  try {
    const resp = await httpPost({
      url: `${LINE_API_ENDPOINT}/${LINE_API_ACCESS_TOKEN}`,
      data,
    }) as LINE.AccessToken;

    return [resp, null];
  } catch (error) {
    console.warn("🚀 ~ getAccessToken ~ error: \n", error)
    return [null, error]
  }
}

export default {
  createLineLoginURL,
  getAccessToken
}