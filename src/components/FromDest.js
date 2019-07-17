import React, { Component } from 'react'
import PropTypes from 'prop-types';

class FromDest extends Component {

    constructor(props) {
        super(props);
        
        this.changeSelected = this.changeSelected.bind(this);
    }

    changeSelected(e) {
        //get the value and airport code of selected element
        //to update select value & airportcode in the app state
        const selectedIndex = e.target.options.selectedIndex;
        const fromcode = e.target.options[selectedIndex].getAttribute('code');
        this.props.handleChange(e.target.value, fromcode);
    }

    render() {

        let options = this.props.dest.map((Data) => {
            const selectedOption = Data.AirportCityName + ', ' + Data.AirportName + ' ('+ Data.AirportCode + ')';
            return <option key={Data.DestinationID} code={Data.AirportCode} value={selectedOption}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
        });

        return (
            <select value={this.props.fromvalue} onChange={this.changeSelected}>
                    {options}
            </select>
        )
    }
}

FromDest.propTypes = {
    dest: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default FromDest;
