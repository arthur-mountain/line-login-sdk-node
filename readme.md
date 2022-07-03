# Line login methods
---
### Functions:

1. createLineLoginURL： create a line url for line login.

2. getAccessToken： get the access token.

3. verifyAccessToken： verify the access token.

4. verifyIdToken： verify the id toekn.

5. refreshAccessToken： refresh the old access token, get new access token.

6. revokeAccessToken： revoke the access token.

7. getUserInfo： get simple user info.

8. getUserProfile： get user profile that has more information than userInfo.

9. getFriendshipStatus： get friend ship. Has added office account and not block it.

10. generateCodeVerifier： create verifier string for line login url query code_verifier.

11. getLoginPkceQuery： get line login pkce query and put it into createLineLoginURL as parameters.

12. generateNonce： create line login url query nonce string.