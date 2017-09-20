import React from 'react';
import RecipeActions from '../recipe_actions';
import renderer from 'react-test-renderer';

test('display ingredient actions', () => {
    const wrapper = renderer.create(
        <RecipeActions recipe={{id: 456456, catalog_id: 123123}}/>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
});