import React, {Component} from 'react';
import logo from './logo.svg';

import {Mastodon} from './javascripts/components/containers/mastodon';
import {LoginForm, isLoggedIn} from './javascripts/components/Form.js';
import axios from 'axios';

class App extends Component {

    render() {
        if (isLoggedIn()) {
            return (<Mastodon locale="en"/>);
        } else {
            return (<LoginForm />);
        }
    }

}

export default App;
