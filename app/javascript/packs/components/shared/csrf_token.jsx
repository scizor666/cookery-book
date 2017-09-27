import React from 'react';

export default class CSRFToken extends React.Component {

    static extractToken() {
        return document.querySelector('meta[name="csrf-token"]').content;
    }

    render() {
        return <input type="hidden" name="authenticity_token" value={CSRFToken.extractToken()}/>;
    }
}