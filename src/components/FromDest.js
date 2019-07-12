import React, { Component } from 'react'
import DestData from '../Data/Dest.json'
import axios from 'axios';

class FromDest extends Component {

    state = {
        dest:[],
        prices:[]
    }
    
    componentDidMount() {
        axios.get('/Api/DestinationCache/GetAllDestinations/?destinations_language=en')
        .then(res => this.setState({ dest : res.data }))
        axios.get('/Api/CalendarPricesCache/GetPrices/?DEP=PRG&ARR=AMS&MONTH_SEL=05/2019&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
        .then(res => this.setState({ prices : res.data }))
    }

    render() {
        console.log(this.state.dest) ;
        console.log(this.state.prices) ;
        return (
            <div className="select">
                <label className="DestLabel">From</label>
                <select>

                    <option>{DestData[63].AirportCityName}, {DestData[63].AirportName} ({DestData[63].AirportCode})</option>
                    
                    {DestData.map((Data) => {
                        return <option key={Data.DestinationID}>{Data.AirportCityName}, {Data.AirportName} ({Data.AirportCode})</option>
                    
                    })}

                </select> 
            </div>
        )
    }
}

export default FromDest;
