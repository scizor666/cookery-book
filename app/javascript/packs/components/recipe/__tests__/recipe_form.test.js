import React from 'react';
import RecipeForm from '../recipe_form';
import {recipe} from './test_data';
import renderer from 'react-test-renderer';

jest.mock('../../shared/csrf_token', () => 'CSRFToken');

test('display recipe form', () => {
    const recipeForm = renderer.create(
        <RecipeForm recipe={recipe}
            header={'Edit Recipe'}
            action={'Update Recipe'}
        />
    );
    expect(recipeForm.toJSON()).toMatchSnapshot();
});