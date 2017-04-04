import React, {Component} from 'react';
import logo from './logo.svg';

import {Mastodon, populateInitialState} from './javascripts/components/containers/mastodon';
import axios from 'axios';

function getAttrsByTagName(tag_name, html_blob) {
    var re = new RegExp('\<\s*'+tag_name+'\s*(.+?)\>');
    var tags = [];
    var tagMatch;
    while (tagMatch = re.exec(html_blob)) {
        var tag = {};
        var tagRe = /"?(.+?)"?\s*=\s+"?(.+?)\"/;
        var attrMatch;
        while (attrMatch = tagRe.exec(tagMatch)) {
            var k = attrMatch[1];
            var v = attrMatch[2];
            tag[k] = v;
        }
        tags.push(tag);
    }
    return tags;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {initialState: null, userEmail: null, password: null, fetchingState: false};
        this.populateState();
    }

    populateState() {
        var store = window.localStorage.getItem('initialState');
        if (store !== null) {
            var init = JSON.parse(store);
            this.state.initialState = init;
        } else {
            this.fetchInitialState();
        }
    }

    hasLoginInfo() {
        return !!(this.state.userEmail && this.state.password);
    }

    isFetchingState() {
        return this.state.fetchingState;
    }

    setInitialStateJson(jsonBlob) {
        window.localStorage.setItem('initialState', jsonBlob);
        var state = JSON.parse(jsonBlob);
        this.setState({initialState: state});
    }

    fetchInitialState() {
        this.state.fetchingState = true;
        var userEmail = this.state.userEmail;
        var password = this.state.password;
        axios.get('/auth/sign_in').then(function(first_response) {
            if (first_response.status == 200) {
                var metaTags = getAttrsByTagName('meta', first_response.body);
                var csrfKey = null;
                var csrfValue = null;
                for (var i=0; i < metaTags.length; i++) {
                    var tag = metaTags[i];
                    var name = tag.name;
                    if (name) {
                        if (name == 'csrf-param') {
                            csrfKey = tag.content;
                        }
                        if (name == 'csrf-token') {
                            csrfValue = tag.content;
                        }
                    }
                }

                var params = {
                    'utf8':'%E2%9C%93',
                    'user%5Bemail%5D':userEmail,
                    'user%5Bpassword%5D':password,
                    'button':''
                };
                params[csrfKey] = csrfValue;



                axios.post('/auth/sign_in', params).then(function(authResponse) {
                    if (authResponse.status == 200) {
                        axios.get('/web/getting-started').then(function(appResponse) {
                            if (appResponse.status == 200) {
                                var re = /window\.INITIAL_STATE\s*=\s*(.+?)(?:\;|\n)/;
                                this.setInitialStateJson(re[1].trim());
                            }
                        });
                    }
                });
            }
        })
    }

    render() {
        if (this.isFetchingState()) {
            return (<h1>loading...</h1>);
        } else if (this.state.initialState) {
            populateInitialState(this.state.initialState);
            return (<Mastodon locale="en"/>);
        } else {
            return (
                <form onSubmit={this.loginFormSubmit}>
                    <label>email: </label><input type="text" name="email"/><br/>
                    <label>password: </label><input type="password" name="password"/><br/>
                    <input type="submit" value="submit"/>
                </form>
            );
        }
    }

}

export default App;
