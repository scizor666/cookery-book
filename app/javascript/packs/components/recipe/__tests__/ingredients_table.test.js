import React from 'react';
import {ingredients} from './test_data';
import renderer from 'react-test-renderer';
import IngredientsTable from '../ingredients_table';

jest.mock('../ingredient_row', () => 'IngredientRow');

test('display ingredients table', () => {
    const wrapper = renderer.create(
        <IngredientsTable ingredients={ingredients} caloricity={123.45}/>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
});