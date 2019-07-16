import React, { Component } from 'react'
import uuid from 'uuid';

class Table extends Component {
    render() {

        let tbody;

        if(this.props.initial){
            tbody = <tbody>
                        <tr>
                            <td colSpan="4" className="py-4"><em>Please select the date of your travel</em></td>
                        </tr>
                    </tbody>
        }

        else{
            tbody = <tbody>
                    {this.props.prices.calendarPriceList.dayList.map((Trip) => {
                        if(Trip.status === "AVAILABLE"){
                            return <tr key={uuid.v4()}>
                                <td>{Trip.date}</td> 
                                <td>{Trip.price}</td>
                                <td>{Trip.seats}</td>
                                <td>{Trip.duration}</td>
                            </tr>
                        }
                        else{
                            return null
                        }
                    })}
                        
                    </tbody>
        }

        return (
            <table className="PricesTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Seats</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                {tbody}
            </table>
        )
    }
}

export default Table
