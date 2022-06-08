declare namespace Main {
  interface LineLoginUrl {
    client_id: string; // line login channel id
    redirect_uri: string; // redirect url query will contain code and state after login successfully
    scope: string; // profile openid email, email should settings in line developers
    state: string; // avoid xss attack, redirect url should check state is as same as this value;  
    nonce?: string; // avoid reply attack, will display in id_token;
    prompt?: string; // default:consent, permission page always show
    max_age?: number; // token max age
    ui_locales?: string; // line login local
    bot_prompt?: 'normal' | 'aggressive'; // the add line bot to be friend view type
    initial_amr_display?: string; // if is 'lineqr', the login page will only show qr code login;
    switch_amr?: boolean; // default:true, will show different login methods,like email login, qr code login ...etc
    disable_ios_auto_login?: boolean; // default:false, will not block ios auto login
  }

  interface AccessToken {
    code: string;
    client_id: string;
    redirect_uri: string;
  }
}