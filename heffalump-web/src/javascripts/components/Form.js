import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {populateInitialState} from './containers/mastodon';

export class Form extends Component {

    formBody() {
        return (<h1>override me</h1>);
    }

    formFooter() {
        return null;
    }

    render() {
        return (
            <div>
                <div id="form-container">
                    {this.formBody()} 
                </div>
                <div className="form-footer">
                    {this.formFooter()}
                </div>
            </div>
        );
    }

}

export class LoginForm extends Form {

    formBody() {
        return (
            <form id="new_user" className="simple_form new_user" novalidate="novalidate" onSubmit={this.submit}>
                <div className="input email required user_email">
                    <input 
                        id="user_email"
                        className="string email required"
                        aria-label="E-mail address"
                        autofocus="autofocus"
                        placeholder="E-mail address"
                        type="email"/>
                </div>
                <div className="input password required user_password">
                    <input
                        id="user_password"
                        className="password required"
                        aria-label="Password"
                        placeholder="Password"
                        type="password"/>
                </div>
                <div className="actions">
                    <button className="btn" type="submit">Log In</button>
                </div>
            </form>
        );
    }

    formFooter() {
        <ul className="no-list">
            <li><a href="/auth/sign_up">Sign Up</a></li>
            <li><a href="/auth/password/new">Forgot your password?</a></li>
            <li><a href="/auth/confirmation/new">Didn't recieve confirmation instructions?</a></li>
        </ul>
    }

}

export function initialState() {
    var blob = window.localStorage.getItem("initialState");
    if (blob) {
        var res = JSON.parse(blob);
        populateInitialState(res);
        return res;
    } else {
        return null;
    }
}

export function isLoggedIn() {
    return initialState() !== null;
}
