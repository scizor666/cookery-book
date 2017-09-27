import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {recipes} from './test_data';
import RecipeCard from '../recipe_card';
import Catalog from '../catalog';

jest.mock('react-infinite-scroller', () => 'InfiniteScroll');


test('display when loading', () => {
    const wrapper = renderer.create(<Catalog/>);
    expect(wrapper.toJSON()).toMatchSnapshot();
});

test('display a catalog with products', () => {
    const wrapper = mount(<Catalog/>);
    wrapper.setState({recipes});
    expect(wrapper.find(RecipeCard).length).toBe(2);
});