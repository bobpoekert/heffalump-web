# heffalump-web
Web browser javascript client for the Heffalump microblogging server

Changes relative to mastodon
---

* All of the server code as been removed
* The build system has been changed from ruby bundler to react-scripts

How to log in (the temporary, ghetto way)
---

* View Source on mastodon.social after you've logged in (if you want to use a different instance you have to change "proxy" in package.json)
* Load this app (eg: using `npm start`) and open a javascript console
* Copy the value of window.STREAMING_API_BASE_URL and run window.localStorage.putItem('streaming_api_base_url', $that)
* Copy the value of window.INITIAL_STATE and run window.localStorage.putItem('initialState', $that)
* Reload the page
