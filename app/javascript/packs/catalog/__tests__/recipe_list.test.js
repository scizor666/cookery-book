import React from 'react';
import renderer from 'react-test-renderer';
import {recipes} from './test_data';
jest.mock('../recipe_card', () => 'RecipeCard');
import RecipeList from '../recipe_list';

test('display a recipe list', () => {
    const wrapper = renderer.create(
        <RecipeList recipes={recipes}/>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
});