import React from 'react';
import renderer from 'react-test-renderer';
import SignInForm from '../sign_in_form';

jest.mock('../../shared/csrf_token', () => 'CSRFToken');


test('display sign in form', () => {
    const wrapper = renderer.create(<SignInForm/>);
    expect(wrapper.toJSON()).toMatchSnapshot();
});