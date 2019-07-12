import React, { Component } from 'react'
import DestData from '../Data/Dest.json'

class ToDest extends Component {

    state = {
        empty:true
    }

    render() {
        console.log(this.state.empty)
        return (
            <div className="select">
                <label className="DestLabel">To</label>
                <select>
                    <option></option>
                    {DestData.map((Data) => {
                        return <option key={Data.DestinationID}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
                    })}
                </select> 
            </div>
        )
    }
}

export default ToDest;
