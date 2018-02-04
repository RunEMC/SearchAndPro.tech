import React from 'react';

import ChildTrait from './ChildTrait.js';

export default class ParentTrait extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChildren : false
        }
        this.precisionRound = this.precisionRound.bind(this);
        this.toggleChildren = this.toggleChildren.bind(this);
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    toggleChildren() {
        this.setState(prevState => ({
            showChildren : !prevState.showChildren
        }));
        console.log("Toggle : ", this.state.showChildren);
    }

    render() {
        var childDisplay = this.state.showChildren ? "" : "hidden-children";

        var trait = this.props.trait;
        var percentile = this.precisionRound(trait.percentile, 2);

        var childTraits = trait.children.map((childTrait, index) => 
            <ChildTrait trait={childTrait} key={index}/>
        )

        return (
            <div className="trait-parent">
                <div className="trait-tile" onClick={this.toggleChildren}><span>{trait.name}</span><span>{percentile}</span></div>
                <div className={"trait-children " + childDisplay}>
                    {childTraits}
                </div>
            </div>
        )
    }
}