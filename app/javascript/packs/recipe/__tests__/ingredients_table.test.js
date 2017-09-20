import React from 'react';
import {ingredients} from './test_data';
import renderer from 'react-test-renderer';
jest.mock('../ingredient_row', () => 'IngredientRow');
import IngredientsTable from '../ingredients_table';

test('display ingredients table', () => {
    const wrapper = renderer.create(
        <IngredientsTable ingredients={ingredients} caloricity={123.45}/>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
});