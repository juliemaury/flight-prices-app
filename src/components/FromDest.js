import React, { Component } from 'react'
import PropTypes from 'prop-types';

class FromDest extends Component {

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
                <label className="DestLabel">From</label>
                <select id="from" onChange={this.handleChange}>
                    {this.props.dest.map((Data) => {
                        const option = Data.AirportCityName + ', ' + Data.AirportName + ' ('+ Data.AirportCode + ')';
                        if(Data.AirportCityName === 'Prague'){
                            return <option selected key={Data.DestinationID} value={option}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
                    
                        } else{
                            return <option selected="" key={Data.DestinationID} value={option}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
                        }
                    })}
                </select> 
            </div>
        )
    }
}

FromDest.propTypes = {
    dest: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    fromvalue: PropTypes.string.isRequired,
}

export default FromDest;
