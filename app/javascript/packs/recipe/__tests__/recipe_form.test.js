import React from 'react';
import RecipeForm from '../recipe_form';
import {recipe} from './test_data';
import renderer from 'react-test-renderer';

test('display recipe form', () => {
    const recipeForm = renderer.create(
        <RecipeForm recipe={recipe}
            header={'Edit Recipe'}
            action={'Update Recipe'}
            csrfToken={'someToken'}/>
    );
    expect(recipeForm.toJSON()).toMatchSnapshot();
});