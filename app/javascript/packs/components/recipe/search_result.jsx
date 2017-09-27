import React from 'react';

export default class SearchResult extends React.Component {

    render() {
        return <li className="autocomplete-item" onClick={() => this.props.handleSelect(this.props.resultId)}>
            <span><b>{this.props.result.name}</b> Caloricity: {this.props.result.caloricity} kcal/100g</span>
        </li>;
    }
}