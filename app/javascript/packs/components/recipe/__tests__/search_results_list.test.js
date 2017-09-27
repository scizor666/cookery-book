import React from 'react';
import SearchResultsList from '../search_results_list';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const results = [{caloricity: 100.99, name: 'some name'}, {caloricity: 66.12, name: 'one more result'}];

[results, []].forEach((results) => {
    test(`display for a${results.length > 0 ? ' not' : 'n'} empty search results list`, () => {
        const searchResult = renderer.create(
            <SearchResultsList results={results}/>
        );
        expect(searchResult.toJSON()).toMatchSnapshot();
    });
});


const focusEventsMock = jest.fn();
const wrapper = shallow(<SearchResultsList results={[]} setPreventHideDropdown={focusEventsMock}/>);
for (let [key, value] of Object.entries({mouseEnter: true, mouseLeave: false})) {
    test(`check for ${key}`, () => {
        wrapper.find('#autocomplete-items').simulate(key);
        expect(focusEventsMock).toBeCalledWith(value);
    });
}