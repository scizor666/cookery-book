import React from 'react';
import SearchResult from './search_result';

export default class SearchResultsList extends React.Component {

    handleSelect(i) {
        this.props.handleSelect(this.props.results[i]);
    }

    renderMessage() {
        if (this.props.results.length === 0) {
            return <li>No products found</li>;
        }
    }

    render() {
        let handleSelect = (i) => this.handleSelect(i);
        return <div id="autocomplete-items-container">
            <ul id="autocomplete-items"
                onMouseEnter={() => {this.props.setPreventHideDropdown(true);}}
                onMouseLeave={() => {this.props.setPreventHideDropdown(false);}}>
                {this.renderMessage()}
                {this.props.results.map(function (result, index) {
                    return <SearchResult key={index}
                        result={result}
                        resultId={index}
                        handleSelect={handleSelect}
                    />;
                })}
            </ul>
        </div>;
    }
}