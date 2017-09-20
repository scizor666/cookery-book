import React from 'react';
import RecipeList from '../recipe_list';
import renderer from 'react-test-renderer';
import {recipes} from './recipe_card.test';

test('display a recipe list', () => {
    const wrapper = renderer.create(
        <RecipeList recipes={recipes}/>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
});