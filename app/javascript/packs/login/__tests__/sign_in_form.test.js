import React from 'react';
import renderer from 'react-test-renderer';
import SignInForm from '../sign_in_form';


test.skip('display when loading', () => {
    const wrapper = renderer.create(<SignInForm csrfToken="someTokenValueHere"/>);
    expect(wrapper.toJSON()).toMatchSnapshot();
});