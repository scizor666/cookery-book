/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import './components/recipe/recipe_form';
import './components/catalog/catalog';
import './components/recipe/recipe';
import React from 'react';
import ReactDOM from 'react-dom';
import SignInForm from './components/login/sign_in_form';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {

    render() {
        return <Router>
            <Switch>
                <Route exact path="/" component={SignInForm}/>
                <Route exact path="/login" component={SignInForm}/>
                <Route component={() => window.location = window.location.origin}/>
            </Switch>
        </Router>;
    }
}

document.addEventListener('turbolinks:load', function () {
    const catalogContainer = document.getElementById('app_root');
    if (catalogContainer) {
        ReactDOM.render(<App/>, catalogContainer);
    }
});