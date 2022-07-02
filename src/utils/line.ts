import { createHash } from 'crypto';
import { getRandNumBetween } from './common.js'

// check the necessary config key, value is exist 
export const checkLineLoginConfig = (config: MAIN.LineLoginUrl): boolean => {
  return !!(
    config?.client_id &&
    config?.redirect_uri &&
    config?.scope &&
    config?.state
  )
}

// generate code verifier
export const generateCodeVerifier = (length: number = 128): string => {
  if (length > 128) length = 128
  if (length < 43) length = 43
  const verifierChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"

  return Array(length).fill(0).reduce((acc) => (
    acc += verifierChar[getRandNumBetween(0, verifierChar.length)]
  ), '')
}

// URLSearchParams can get `code_challenge` and `code_challenge_method`
export const getLoginPkceQuery = (codeVerifier: string, method: string = 'sha256') => {
  const code_challenge_method = method
  const code_challenge = createHash(code_challenge_method).update(codeVerifier).digest("base64url")

  return new URLSearchParams(`code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}`)
}

// generate nonce
export const generateNonce = () => {
  return Buffer.from(generateCodeVerifier(43)).toString("base64url")
}
