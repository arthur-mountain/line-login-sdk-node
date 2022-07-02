// LINE response
declare namespace LINE {
  interface AccessToken {
    access_token: string;
    expires_in: number;
    id_token: string; // JWT Token with information about the user. This property is returned only if you requested the openid scope.
    refresh_token: string;
    scope: string; // permissions granted
    token_type: 'Bearer';
  }

  interface VerifyToken {
    scope: string; // permissions granted
    client_id: string;
    expires_in: number;
  }

  interface VerifyIdToken {
    iss: string; // The URL that generate the ID token.
    sub: string; // User ID for which the ID token was be generated.
    aud: string; // Channel ID
    exp: number;
    iat: number; // Time when the ID token was be generated in UNIX time.
    nonce: string;
    amr: LonginMethods[], // A list of authentication methods used by the user
    name: string; // User's display name
    picture: string; // User's profile image URL.
    email: string; // User's email. Only if the email scope was be opend.
  }

  type LonginMethods = 'pwd' | 'lineautologin' | 'lineqr' | 'linesso'

  interface RefreshToken {
    token_type: string;
    scope: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }

  interface RevokeToken { // Revoke succes, response will return empty object
  }

  interface UserInfo {
    sub: string;
    name: string;
    picture: string;
  }

  interface UserProfile {
    userId: string;
    displayName: string;
    pictureUrl: string;
    statusMessage: string;
  }

  // The user has added the LINE Official Account as a friend and has not blocked it.
  interface FriendShipStatus {
    friendFlag: boolean;
  }

  interface ErrorResponse {
    error: string;
    message: string;
  }
}