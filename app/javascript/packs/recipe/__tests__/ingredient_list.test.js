import React from 'react';
import IngredientList from '../ingredient_list';
import Ingredient from '../ingredient';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

export const ingredients = [
    {
        weight: 300,
        id: 1,
        product: {
            id: 2,
            name: 'chicken',
            caloricity: 107.7
        }
    },
    {
        weight: 155,
        id: 2,
        product: {
            id: 1,
            name: 'carrot',
            caloricity: 44
        },
    }];

test('ingredient list displayed', () => {
    const ingredientList = renderer.create(
        <IngredientList ingredients={ingredients}/>
    );
    expect(ingredientList.toJSON()).toMatchSnapshot();
});

test('add a new ingredient', () => {
    const ingredientList = mount(
        <IngredientList ingredients={ingredients.slice(0, 1)}/>
    );
    expect(ingredientList.find(Ingredient).length).toBe(1);
    expect(ingredientList.find(Ingredient).at(0).find('.remove-ingredient').props()['style']['display']).toBe('none');

    ingredientList.find('#add_new_ingredient').simulate('click');
    expect(ingredientList.find(Ingredient).length).toBe(2);
    ingredientList.find(Ingredient).forEach(i => {
        expect(i.find('.remove-ingredient').props()['style']['display']).toBe('block');
    });
});

test('remove an ingredient', () => {
    const ingredientList = mount(
        <IngredientList ingredients={ingredients}/>
    );
    expect(ingredientList.find(Ingredient).length).toBe(2);
    ingredientList.find(Ingredient).forEach(i => {
        expect(i.find('.remove-ingredient').props()['style']['display']).toBe('block');
    });

    ingredientList.find('.remove-ingredient').at(0).simulate('click');
    expect(ingredientList.find(Ingredient).length).toBe(1);
    expect(ingredientList.find(Ingredient).at(0).find('.remove-ingredient').props()['style']['display']).toBe('none');
});

test('call autocomplete when name is changing', () => {
    const ingredientList = shallow(<IngredientList ingredients={ingredients}/>);
    ingredientList.instance().autoComplete = jest.fn();
    ingredientList.update();
    const ingredientKey = 0;
    const searchPhrase = 'searchPhrase';
    ingredientList.instance().handleUserInput(ingredientKey, 'name', searchPhrase);
    expect(ingredientList.instance().autoComplete).toBeCalledWith(ingredientKey, searchPhrase);
});

test('select name for ingredient changes ingredient data', () => {
    const ingredientList = shallow(<IngredientList ingredients={ingredients}/>);
    const option = ingredients[1].product;
    const ingredientKey = 0;
    ingredientList.instance().handleSelect(ingredientKey, option);
    const newIngredientState = ingredientList.state('ingredients')[ingredientKey];
    expect(newIngredientState.product).toEqual(option);
    expect(newIngredientState.id).toBe('');
    expect(newIngredientState.searchResults).toBeUndefined();
});