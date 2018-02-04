import React from 'react';

export default class ChildTrait extends React.Component {
    constructor(props) {
        super(props);

        this.precisionRound = this.precisionRound.bind(this);
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    render() {
        var trait = this.props.trait;
        var percentile = this.precisionRound(trait.percentile, 2);

        return (
            <div className="trait-tile"><span>{trait.name}</span><span>{percentile}</span></div>
        )
    }
}