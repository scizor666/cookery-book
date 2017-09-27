import React from 'react';
import CSRFToken from "../shared/csrf_token";

export default class SignInForm extends React.Component {

    render() {
        return <div className='row'>
            <div className='col-md-3 col-md-offset-3 container'>
                <h1 className='text-center'>Log in</h1>
                <form action="/login" acceptCharset="UTF-8" method="post">
                    <input name="utf8" type="hidden" value="&#x2713;"/>
                    <CSRFToken/>
                    <div className='form-group'>
                        <label htmlFor="session_email">Email</label>
                        <input className="form-control" type="email" name="session[email]" id="session_email"/>
                        <label htmlFor="session_password">Password</label>
                        <input className="form-control" type="password" name="session[password]" id="session_password"/>
                        <label className="checkbox inline" htmlFor="session_remember_me">
                            <input name="session[remember_me]" type="hidden" value="0"/>
                            <input type="checkbox" value="1" name="session[remember_me]" id="session_remember_me"/>
                            <span>Remember me on this computer</span>
                        </label>
                    </div>
                    <div className='form-group col-md-12 text-center'>
                        <input type="submit" name="commit" value="Log in" className="btn btn-primary"
                            data-disable-with="Log in"/>
                    </div>
                    New user? <a href="/users/new">Sign up now!</a>
                </form>
            </div>
        </div>;
    }
}