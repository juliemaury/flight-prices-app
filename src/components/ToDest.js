import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ToDest extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(e) {
        this.props.handleChange(e.target.value);
      }

    render() {

        return (
            <div className="select">
                <label className="DestLabel">To</label>
                <select id="to" onChange={this.handleChange}>
                    <option selected hidden> </option>
                    {this.props.dest.map((Data) => {
                    const option = Data.AirportCityName + ', ' + Data.AirportName + ' ('+ Data.AirportCode + ')';
                        return <option selected="" key={Data.DestinationID} value={option}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
                    })}
                </select> 
            </div>
        )
    }
}

ToDest.propTypes = {
    dest: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    tovalue: PropTypes.string.isRequired,
}

export default ToDest;
