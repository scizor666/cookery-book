import React from 'react';
import RecipeCard from '../recipe_card';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

export const recipes = [
    {
        id: 123456,
        name: 'some recipe',
        description: 'some description here',
        short_description: 'some short description here',
        image_url: 'http://some.url/with_picture.png'
    },
    {
        id: 678990,
        name: 'some other recipe',
        description: 'some other description here',
        short_description: 'some other short description here',
    }
];

recipes.forEach((recipe) => {
    test(`display a recipe card with${recipe.image_url ? ' an image' : 'out an image'}`, () => {
        const wrapper = renderer.create(
            <RecipeCard recipe={recipe} placeholderUrl={'http://some.placeholder.url/with_image.png'}/>
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});

test('initiate recipe removal', () => {
    const wrapper = shallow(<RecipeCard recipe={recipes[0]}/>);
    wrapper.instance().handleDelete = jest.fn();
    wrapper.find(`#delete_recipe_${recipes[0].id}`).simulate('click');
    expect(wrapper.instance().handleDelete).toBeCalledWith();
});