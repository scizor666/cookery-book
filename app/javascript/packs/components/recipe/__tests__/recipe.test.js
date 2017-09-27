import React from 'react';
import {recipe} from './test_data';
import renderer from 'react-test-renderer';
import Recipe from '../recipe';

jest.mock('../recipe_actions', () => 'RecipeActions');
jest.mock('../ingredients_table', () => 'IngredientsTable');

test('display a recipe', () => {
    const wrapper = renderer.create(<Recipe recipe={recipe}/>);
    expect(wrapper.toJSON()).toMatchSnapshot();
});