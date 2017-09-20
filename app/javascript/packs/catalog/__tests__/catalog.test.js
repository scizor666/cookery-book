import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {recipes} from './recipe_card.test';
import RecipeCard from '../recipe_card';
jest.mock('react-infinite-scroller', () => 'InfiniteScroll');
import Catalog from '../catalog';


test('display when loading', () => {
    const wrapper = renderer.create(<Catalog/>);
    expect(wrapper.toJSON()).toMatchSnapshot();
});

test('display a catalog with products', () => {
    const wrapper = mount(<Catalog/>);
    wrapper.setState({recipes});
    expect(wrapper.find(RecipeCard).length).toBe(2);
});