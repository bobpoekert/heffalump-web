Login procedure
---

1. Request https://mastodon.social/auth/sign_in
    * //meta[@name="csrf-param"]/@content -> csrf_key
    * //meta[@name="csrf-token"]/@content -> csrf_value
2. Submit a post request to https://mastodon.social/auth/sign_in with the following application/x-www-form-urlencoded postdata
    * utf8=%E2%9C%93
    * $csrf_key=$csrf_value
    * user%5Bemail%5D=$account_email
    * user%5Bpassword%5D=$account_password
    * button=
4. Request https://mastodon.social/web/getting-started with cookies set by 2
    * there will be a script tag containing `window.INITIAL_STATE =` followed by a json object
    * this is passed to the react app with store.dispatch() 



