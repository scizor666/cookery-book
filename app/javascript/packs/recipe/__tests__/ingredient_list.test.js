import React from 'react';
import IngredientList from '../ingredient_list';
import Ingredient from '../ingredient';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const ingredients = [
    {
        weight: 300,
        ingredientId: 1,
        name: 'chicken',
        productId: 2,
        caloricity: 107.7
    },
    {
        weight: 155,
        ingredientId: 2,
        name: 'carrot',
        productId: 1,
        caloricity: 44
    }];

test('ingredient list displayed', () => {
    const ingredientList = renderer.create(
        <IngredientList ingredients={ingredients}/>
    );
    let tree = ingredientList.toJSON();
    expect(tree).toMatchSnapshot();
});

test('new ingredient component added', () => {
    const ingredientList = shallow(
        <IngredientList ingredients={ingredients}/>
    );
    expect(ingredientList.find(Ingredient).length).toBe(2);

    ingredientList.find('#add_new_ingredient').simulate('click');
    expect(ingredientList.find(Ingredient).length).toBe(3);
});