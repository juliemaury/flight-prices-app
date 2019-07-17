import React, { Component } from 'react'
import PropTypes from 'prop-types';

class FromDest extends Component {

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //get the value and airport code of selected element
        //to update select value & airportcode in the app state
        const selectedIndex = e.target.options.selectedIndex;
        const fromcode = e.target.options[selectedIndex].getAttribute('code');
        this.props.handleChange(e.target.value, fromcode);
    }

    render() {

        let selectedvalue;

        let options = this.props.dest.map((Data) => {
            const option = Data.AirportCityName + ', ' + Data.AirportName + ' ('+ Data.AirportCode + ')';
            
            if(!this.props.switch) { selectedvalue = this.props.value1 }
            else{ selectedvalue = this.props.value2 }
            return <option selected={selectedvalue === option} key={Data.DestinationID} code={Data.AirportCode} value={option}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
        });

        return (
            <select value={selectedvalue} onChange={this.handleChange}>
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
