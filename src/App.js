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
    };

    this.fromDestChange = this.fromDestChange.bind(this);
    this.toDestChange = this.toDestChange.bind(this);
    this.switchDest = this.switchDest.bind(this);
    this.getFromCode = this.getFromCode.bind(this);
    this.getToCode = this.getToCode.bind(this);
  }

  fromDestChange(fromvalue){
    this.setState({fromvalue});
    axios.get('/Api/CalendarPricesCache/GetPrices/?DEP='+ this.state.tocode + '&ARR=' + this.state.fromcode +'&MONTH_SEL=' + this.state.monthcode + '/' + this.state.yearcode + '&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
    .then(res => this.setState({ prices : res.data }))
  }
    

  toDestChange(tovalue){
    this.setState({tovalue});
    //change the state if user selected arrival destination
    if(tovalue !== ""){
      this.setState({displayswitch:true});
    }
    //refresh the results 
    axios.get('/Api/CalendarPricesCache/GetPrices/?DEP='+ this.state.tocode + '&ARR=' + this.state.fromcode +'&MONTH_SEL=' + this.state.monthcode + '/' + this.state.yearcode + '&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
    .then(res => this.setState({ prices : res.data }))
  }

  getFromCode(fromcode){
    if(!this.state.switch){
      this.setState({fromcode:fromcode})
    }
    else{
      this.setState({tocode:fromcode})
    }
  }

  getToCode(tocode){
    if(!this.state.switch){
      this.setState({tocode:tocode})
    }
    else{
      this.setState({fromcode:tocode})
    }
  }

  componentDidMount() {
    axios.get('/Api/DestinationCache/GetAllDestinations/?destinations_language=en')
    .then(res => this.setState({ dest : res.data }))
  }

  switchDest(){
    //switch airport codes 
    let from = this.state.fromcode
    let to = this.state.tocode
    this.setState({fromcode:to})
    this.setState({tocode:from})
    //change the state on clic on switch button
    if(this.state.switch === false){
      this.setState({switch: true});
    }else{
      this.setState({switch: false});
    }
    //refresh the results
    axios.get('/Api/CalendarPricesCache/GetPrices/?DEP='+ to + '&ARR=' + from +'&MONTH_SEL=' + this.state.monthcode + '/' + this.state.yearcode + '&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
    .then(res => this.setState({ prices : res.data }))
  }

  render(){

    //hidden content classes 
    let classswitch = 'switch-button h100 hidden'
    let hiddenrow = "row p-4 hidden"

    //add class is-visible and delete class hidden if user selected arrival destination
    if(this.state.displayswitch === true){
      classswitch = 'switch-button h100 is-visible'
      hiddenrow = "row p-4 is-visible"
    }

    //switch FromDest and ToDest components depending on switch state
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

    //content to display using bootstrap framework
    return (
        <div className="App">
          <div className="container py-4">
            <h1 className="py-5">Choose your flight !</h1>

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
                    <Switch />
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
                    if(selectedMonth > 8) {
                      this.setState({ yearcode : selectedYear, monthcode : selectedMonth + 1 });
                      axios.get('/Api/CalendarPricesCache/GetPrices/?DEP='+ this.state.fromcode + '&ARR=' + this.state.tocode +'&MONTH_SEL=' + (selectedMonth + 1) + '/' + selectedYear + '&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
                      .then(res => this.setState({ prices : res.data }))
                      this.setState({initial:false})
                    } 
                    else { 
                      //add a '0' before month code to months from january to september 
                      this.setState({ yearcode : selectedYear, monthcode : '0' + (selectedMonth + 1) });
                      axios.get('/Api/CalendarPricesCache/GetPrices/?DEP='+ this.state.fromcode + '&ARR=' + this.state.tocode +'&MONTH_SEL=0' + (selectedMonth + 1) + '/' + selectedYear + '&SECTOR_ID=0&LANG=cs&ID_LOCATION=cz')
                      .then(res => this.setState({ prices : res.data }))
                      //this.state.initial was true to display the "select a date" message (see Table.js)
                      this.setState({initial:false})
                    }
                  }.bind(this)}
                />
                <Calendar />
              </div>
            </div>

            <div className={hiddenrow}>
              <div className="col-12 p-0">
                <Table 
                  prices={this.state.prices}
                  initial={this.state.initial}
                />
              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default App;
