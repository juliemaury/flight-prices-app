import React, { Component } from 'react';
import Loading from './Loading';
import uuid from 'uuid';

class Table extends Component {
    render() {

        let tbody;

        if(this.props.initial){
            tbody = <tbody>
                        <tr>
                            <td colSpan="4" className="py-4">
                                <p>
                                    <em>Please select the date of your travel</em>
                                </p>
                            </td>
                        </tr>
                    </tbody>
        }

        else if(this.props.loading){
            tbody = <tbody>
                        <tr>
                            <td colSpan="4" className="py-4">
                                <p>
                                    <Loading />
                                </p>
                            </td>
                        </tr>
                    </tbody>
        }

        else if(!this.props.prices.calendarPriceList || !this.props.prices){
            tbody = <tbody>
                        <tr>
                            <td colSpan="4" className="py-4"><em>Sorry, no tickets available for this trip.</em></td>
                        </tr>
                    </tbody>
        }

        else if(!this.props.prices.calendarPriceList.dayList.map(Trip => Trip.status).includes('AVAILABLE')){
            tbody = <tbody>
                        <tr>
                            <td colSpan="4" className="py-4"><em>Sorry, no tickets available for this trip.</em></td>
                        </tr>
                    </tbody>
        }

        else{
            tbody = <tbody>
                        {this.props.prices.calendarPriceList.dayList.map((Trip) => {
                            if(Trip.status === "AVAILABLE"){
                                let olddate = Trip.date;
                                let arr = olddate.split('-');
                                let newdate = arr[2] + '.' + arr[1] + '.' + arr[0];
                                let oldtime = Trip.duration;
                                let timearr = oldtime.split('');
                                if (timearr[0] === '0'){
                                    timearr[0] = '';
                                }
                                let newtime = timearr[0] + timearr[1] + 'h ' + timearr[2] + timearr[3] + 'min';
                                return <tr key={uuid.v4()}>
                                    <td>{newdate}</td> 
                                    <td>{Trip.price} CZK</td>
                                    <td>{Trip.seats}</td>
                                    <td>{newtime}</td>
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

export default Table;
