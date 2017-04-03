import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.STREAMING_API_BASE_URL = 'https://mastodon.social';

ReactDOM.render(
    (<App />),
    document.getElementById('root')
);
