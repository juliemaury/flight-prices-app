import React, { Component } from 'react'
import uuid from 'uuid';

class Table extends Component {
    render() {

        let tbody;

        if(this.props.initial){
            tbody = <tr><td colspan="4" className="py-4"><em>Please select the date of your travel</em></td></tr>
        }

        else{
            tbody = <tbody>
                    {this.props.prices.calendarPriceList.dayList.map((Trip) => {
                        return <tr key={uuid.v4()}>
                            <td>{Trip.date}</td> 
                            <td>{Trip.price}</td>
                            <td>{Trip.seats}</td>
                            <td>{Trip.duration}</td>
                        </tr>})}
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
