import React, { Component } from 'react'
import axios from 'axios';

class ToDest extends Component {

    state = {
        todest:[
          
        ]
      }
    
    componentDidMount() {
        axios.get('https://www.csa.cz/Umbraco/Api/DestinationCache/GetAllDestinations/?destinations_language=en')
        .then(res => this.setState({ todest : res.data }))
    }

    render() {
        return (
            <div className="select">
                <select name="">
                    <option>Arrival airport</option>
                </select> 
            </div>
        )
    }
}

export default ToDest;
