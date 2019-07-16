import React, {Component} from 'react';
import FromDest from './components/FromDest';
import ToDest from './components/ToDest';
import Table from './components/Table';
import axios from 'axios';
import './App.css';
import MonthPickerInput from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      dest:[],
      prices:[],
      yearcode:"",
      monthcode:"",
      fromvalue:"Prague, Ruzyne (PRG)",
      tovalue:"",
      displayswitch:"",
      switch:false,
      fromcode:"PRG",
      tocode:"",
    };

    this.fromDestChange = this.fromDestChange.bind(this);
    this.toDestChange = this.toDestChange.bind(this);
    this.switchDest = this.switchDest.bind(this);
    this.getFromCode = this.getFromCode.bind(this);
    this.getToCode = this.getToCode.bind(this);
  }

  fromDestChange = (fromvalue) =>
  this.setState({fromvalue});

  toDestChange(tovalue){
    this.setState({tovalue});
    if(tovalue !== ""){
      this.setState({displayswitch:true});
    }
  }

  switchDest(){
    if(this.state.switch === false){
      this.setState({switch: true});
    }else{
      this.setState({switch: false});
    }
  }

  getFromCode(fromcode){
    this.setState({fromcode:fromcode})
  }

  getToCode(tocode){
    this.setState({tocode:tocode})
  }

  componentDidMount() {
    axios.get('/Api/DestinationCache/GetAllDestinations/?destinations_language=en')
    .then(res => this.setState({ dest : res.data }))
    axios.get('/Api/CalendarPricesCache/GetPrices/?DEP='+ this.state.fromcode + '&ARR=' + this.state.tocode +'&MONTH_SEL=' + this.state.monthcode + '/' + this.state.yearcode + '&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
    .then(res => this.setState({ prices : res.data }))
  }

  render(){

    let classswitch = 'switch-button h100 hidden'
    let hiddenrow = "row p-4 hidden"

    if(this.state.displayswitch === true){
      classswitch = 'switch-button h100 is-visible'
      hiddenrow = "row p-4 is-visible"
    }

    const displays = this.state.switch;
    let destination1;
    let destination2;

    if (displays) {
      destination2 = 
        <FromDest 
        dest={this.state.dest}
        fromvalue={this.state.fromvalue}
        handleChange={this.fromDestChange}
        airportCode={this.getFromCode}
        />;
      destination1 = 
        <ToDest
        dest={this.state.dest}
        tovalue={this.state.tovalue}
        handleChange={this.toDestChange}
        airportCode={this.getToCode}
        />;

    } else {
      destination2 = 
        <ToDest
        dest={this.state.dest}
        tovalue={this.state.tovalue}
        handleChange={this.toDestChange}
        airportCode={this.getToCode}
        />;
      destination1 = 
        <FromDest 
        dest={this.state.dest}
        fromvalue={this.state.fromvalue}
        handleChange={this.fromDestChange}
        airportCode={this.getFromCode}

        />;
    }

    return (
        <div className="App">
          <div className="container">
            <h1>Choose your flight !</h1>

            <div className="row p-4">
              <div className="col-12 col-md-5 my-2 p-0">
                <div className="select">
                  <label className="DestLabel">From</label>
                    {destination1}
                </div>
              </div>
              <div className="col-12 col-md-2 my-2 p-0 middle">
                <div className="center h100">
                  <button type="button" className={classswitch} onClick={this.switchDest}>
                    <svg id="switchsvg" className="switch-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.03 29.35">
                      <path className="cls-1" d="M36.6,8.89a1.1,1.1,0,0,0-1.54.19l-2.14,2.76A14.67,14.67,0,0,0,5.39,8.13a1.1,1.1,0,1,0,2,1,12.48,12.48,0,0,1,23.4,3.11L27.87,10a1.1,1.1,0,0,0-1.35,1.74l4.92,3.82.11.06a1.05,1.05,0,0,0,.17.09,1.09,1.09,0,0,0,.34.07h.11a1.09,1.09,0,0,0,.38-.09,2.64,2.64,0,0,0,.36-.27l.07-.05,3.82-4.92A1.1,1.1,0,0,0,36.6,8.89Z" />
                      <path className="cls-1" d="M31.23,19.59a1.1,1.1,0,0,0-1.47.51,12.47,12.47,0,0,1-23.47-3l2.87,2.23a1.1,1.1,0,0,0,1.35-1.74L5.59,13.76A1.1,1.1,0,0,0,4.05,14L.23,18.87A1.1,1.1,0,0,0,2,20.22l2.15-2.77a14.67,14.67,0,0,0,27.62,3.62A1.1,1.1,0,0,0,31.23,19.59Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-5 my-2 p-0">
                <div className="select">
                  <label className="DestLabel">To</label>
                    {destination2}
                </div>
              </div>
            </div>

            <div className={hiddenrow}>
              <div className="col-12 p-0 right">
                <label className="selectmonth">Select month and year :</label>
                <MonthPickerInput 
                  year={2019}
                  closeOnSelect={true}
                  mode='calendarOnly' 
                  onChange={function(maskedValue, selectedYear, selectedMonth) {
                    console.log(maskedValue, selectedYear, selectedMonth);
                    if(selectedMonth > 8){
                      this.setState({ yearcode : selectedYear, monthcode : selectedMonth + 1 });
                    } else{
                      this.setState({ yearcode : selectedYear, monthcode : '0' + (selectedMonth + 1) });
                    }
                  }.bind(this)}
                />
              </div>
            </div>

            <div className={hiddenrow}>
              <div className="col-12 p-0">
                <Table prices={this.state.prices}/>
              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default App;
