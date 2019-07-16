import React, { Component } from 'react'
import PropTypes from 'prop-types';

class FromDest extends Component {

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.airportCode = this.airportCode.bind(this);
      }

    handleChange(e) {
        this.props.handleChange(e.target.value);
      }


    airportCode = (e) => { 
        const selectedIndex = e.target.options.selectedIndex;
        let fromcode = e.target.options[selectedIndex].getAttribute('code');
        this.props.airportCode(fromcode);
        /*const selectedIndex = e.target.options.selectedIndex;
        let fromcode = e.target.options[selectedIndex].getAttribute('code');
        this.setState({fromcode:fromcode})*/
        
    }

    twoCalls = (e) => {
        this.handleChange(e)
        this.airportCode(e)
    }
    
    render() {

        let options = this.props.dest.map((Data) => {
            const option = Data.AirportCityName + ', ' + Data.AirportName + ' ('+ Data.AirportCode + ')';
            return <option selected={this.props.fromvalue === option} key={Data.DestinationID} code={Data.AirportCode} value={option}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
        });

        return (
            <select value={this.props.fromvalue} onChange={this.twoCalls}>
                    {options}
            </select>
        )
    }
}

FromDest.propTypes = {
    dest: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    airportCode: PropTypes.func.isRequired,
    fromvalue: PropTypes.string.isRequired,
}

export default FromDest;
