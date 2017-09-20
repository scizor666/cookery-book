import React from 'react';
import IngredientRow from '../ingredient_row';
import {ingredients} from './test_data';
import renderer from 'react-test-renderer';

test('display row ingredient', () => {
    const wrapper = renderer.create(<IngredientRow ingredient={ingredients[0]}/>);
    expect(wrapper.toJSON()).toMatchSnapshot();
});