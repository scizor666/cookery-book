import React from 'react';
import SearchResult from '../search_result';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

const result = {caloricity: 100.99, name: 'some name'};

test('display a search result', () => {
    const searchResult = renderer.create(
        <SearchResult result={result}/>
    );
    expect(searchResult.toJSON()).toMatchSnapshot();
});

test('handle result select', () => {
    const resultId = 12345;
    const handleSelect = jest.fn();
    const wrapper = mount(<SearchResult result={result} resultId={resultId} handleSelect={handleSelect}/>);
    wrapper.find(SearchResult).simulate('click');
    expect(handleSelect).toBeCalledWith(resultId);
});