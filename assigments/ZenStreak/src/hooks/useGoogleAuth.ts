import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "zenstreak",
    path: "oauthredirect",
  });

  // console.log("Redirect URI =>", redirectUri);

  const [request, response, promptAsync] =
    Google.useAuthRequest({
      webClientId:
        "1084546109953-m32bchrmeb77mkaq5nn7ip5rc9e2qfvg.apps.googleusercontent.com",

      androidClientId:
        "1084546109953-lm6eestsrkjfdm1k2dqobsmfsvfchduj.apps.googleusercontent.com",

      redirectUri,
    });

  // console.log("Request URL =>", request?.url);

  return {
    request,
    response,
    promptAsync,
  };
};