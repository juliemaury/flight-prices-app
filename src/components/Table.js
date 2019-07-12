import React, { Component } from 'react'
import PricesData from '../Data/Prices.json'
import uuid from 'uuid';

class Table extends Component {
    render() {
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
                <tbody>
                    {PricesData.calendarPriceList.dayList.map((Trip) => {
                        return <tr key={uuid.v4()}>
                            <td>{Trip.date}</td> 
                            <td>{Trip.price}</td> 
                            <td>{Trip.seats}</td>
                            <td>{Trip.duration}</td>
                        </tr>

                    })}
                </tbody>
            </table>
        )
    }
}

export default Table
