import React, { Component } from 'react'
import PropTypes from 'prop-types';

class FromDest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromcode : "",
        }
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(e) {
        this.props.handleChange(e.target.value);
      }

    render() {
        return (
            <select value={this.props.fromvalue} onChange={this.handleChange}>
                    {this.props.dest.map((Data) => {
                        const option = Data.AirportCityName + ', ' + Data.AirportName + ' ('+ Data.AirportCode + ')';
                        return <option selected={this.props.fromvalue === option} key={Data.DestinationID} value={option}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
                    })}
            </select>
        )
    }
}

FromDest.propTypes = {
    dest: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    fromvalue: PropTypes.string.isRequired,
}

export default FromDest;
