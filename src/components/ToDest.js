import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ToDest extends Component {

    constructor(props) {
        super(props);
        
        this.changeSelected = this.changeSelected.bind(this);
    }

    changeSelected(e) {
        //get the value and airport code of selected element
        //to update select value & airportcode in the app state
        const selectedIndex = e.target.options.selectedIndex;
        const tocode = e.target.options[selectedIndex].getAttribute('code');
        this.props.handleChange(e.target.value, tocode);
        console.log('TODEST.JS TOCODE : ' + tocode)
    }

    render() {

        let options = this.props.dest.map((Data) => {
            const selectedOption = Data.AirportCityName + ', ' + Data.AirportName + ' ('+ Data.AirportCode + ')';
            return <option key={Data.DestinationID} code={Data.AirportCode} value={selectedOption}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
        });

        return (
            <select value={this.props.tovalue}  onChange={this.changeSelected}>
                    <option value="" hidden> </option>
                    {options}
            </select>
        )
    }
}

ToDest.propTypes = {
    dest: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default ToDest;
