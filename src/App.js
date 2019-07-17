import React, {Component} from 'react';
import FromDest from './components/FromDest';
import ToDest from './components/ToDest';
import Table from './components/Table';
import Switch from './components/Switch';
import Calendar from './components/Calendar';
import axios from 'axios';
import './App.css';
import MonthPickerInput from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      dest:[],
      prices:{},
      yearcode:"",
      monthcode:"",
      fromvalue:"Prague, Ruzyne (PRG)",
      tovalue:"",
      displayswitch:"",
      switch:false,
      fromcode:"PRG",
      tocode:"",
      initial:true,
      results:"",
      loading:true,
    };

    this.fromDestChange = this.fromDestChange.bind(this);
    this.toDestChange = this.toDestChange.bind(this);
    this.switchDest = this.switchDest.bind(this);
  }

  componentDidMount() {
    axios.get('/Api/DestinationCache/GetAllDestinations/?destinations_language=en')
    .then(res => this.setState({ dest : res.data }))
  }
  
  fromDestChange(fromvalue, fromcode){
    this.setState({fromcode : fromcode, fromvalue : fromvalue}, function(){
      this.searchTrips();
    });
  }

  toDestChange(tovalue, tocode){
    //change the state if user selected arrival destination for the first time
    if(tovalue !== ""){
      this.setState({displayswitch : true});
    }
    this.setState({loading : true});
    this.setState({tocode : tocode, tovalue : tovalue}, function(){
      this.searchTrips();
    });
  }

  switchDest(){
    this.setState({loading : true});
    //change the state on clic on switch button
    if(this.state.switch === false){
      this.setState({switch : true});
    }else{
      this.setState({switch : false});
    }
    //switch selected values & airport codes in state
    let fromV = this.state.fromvalue;
    let toV = this.state.tovalue;
    let fromC = this.state.fromcode;
    let toC = this.state.tocode;
    //refresh the results
    this.setState({fromcode : toC, tocode : fromC, fromvalue : toV, tovalue : fromV}, function(){
      this.searchTrips();
    });
  }

  searchTrips(){
    //refresh the results 
    this.setState({loading : true});
    axios.get('/Api/CalendarPricesCache/GetPrices/?DEP='+ this.state.fromcode + '&ARR=' + this.state.tocode +'&MONTH_SEL=' + this.state.monthcode + '/' + this.state.yearcode + '&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
    .then(res => this.setState({ prices : res.data, loading : false }))
  }

  render(){

    //hidden content classes 
    let classswitch = 'switch-button h100 hidden'
    let hiddenrow = "row py-4 px-2 hidden"

    //add class is-visible and delete class hidden if user selected an arrival destination
    if(this.state.displayswitch === true){
      classswitch = 'switch-button h100 is-visible'
      hiddenrow = "row py-4 px-2 is-visible"
    }

    //content to display using bootstrap framework
    return (
        <div className="App">
          <div className="container py-4">
            <h1 className="py-4">Choose your flight !</h1>

            <div className="row py-4 px-2">
              <div className="col-12 col-md-5 my-2 p-0">
                <div className="select">
                  <label className="DestLabel">From</label>
                  <FromDest 
                    dest={this.state.dest}
                    handleChange={this.fromDestChange}
                    fromvalue={this.state.fromvalue}
                  />
                </div>
              </div>
              <div className="col-12 col-md-2 my-2 p-0 middle">
                <div className="center h100">
                  <button type="button" className={classswitch} onClick={this.switchDest}>
                    <Switch />
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-5 my-2 p-0">
                <div className="select">
                  <label className="DestLabel">To</label>
                  <ToDest
                    dest={this.state.dest}
                    handleChange={this.toDestChange}
                    tovalue={this.state.tovalue}
                  />
                </div>
              </div>
            </div>

            <div className={hiddenrow}>
              <div className="col-12 p-0 date-wrap">
                <label className="selectmonth">Select month and year :</label>
                  <div className="wrapper">
                  <MonthPickerInput 
                    year={2019}
                    closeOnSelect={true}
                    mode='calendarOnly' 
                    onChange={function(maskedValue, selectedYear, selectedMonth) {
                      this.setState({loading : true});
                      if(selectedMonth > 8) {
                        this.setState({ yearcode : selectedYear, monthcode : selectedMonth + 1}, function(){
                          this.searchTrips();
                        });
                        this.setState({initial : false})
                      } 
                      else { 
                        //add a '0' before month code to months from january to september 
                        this.setState({ yearcode : selectedYear, monthcode : '0' + (selectedMonth + 1)}, function(){
                          this.searchTrips();
                        });
                        //this.state.initial was true to display the "select a date" message (see Table.js)
                        this.setState({initial : false})
                      }
                    }.bind(this)}
                  />
                  <Calendar />
                </div>
              </div>
            </div>

            <div className={hiddenrow}>
              <div className="col-12 p-0">
                <Table 
                  prices={this.state.prices}
                  initial={this.state.initial}
                  loading={this.state.loading}
                />
              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default App;
