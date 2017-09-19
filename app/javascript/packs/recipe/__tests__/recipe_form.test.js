import React from 'react';
import RecipeForm from '../recipe_form';
import {ingredients} from './ingredient_list.test';
import renderer from 'react-test-renderer';

const recipe = {
    id: 100,
    catalog_id: 500,
    name: 'product name here',
    description: 'product description here',
    short_description: 'short product description here',
    ingredients: ingredients
};

test('display recipe form', () => {
    const recipeForm = renderer.create(
        <RecipeForm recipe={recipe}
            header={'Edit Recipe'}
            action={'Update Recipe'}
            csrfToken={'someToken'}/>
    );
    expect(recipeForm.toJSON()).toMatchSnapshot();
});