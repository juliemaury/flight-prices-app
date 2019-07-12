Use of React JS + Bootstrap for the responsive design

///////////////////////////////

Error when trying to get data from https://www.csa.cz/Umbraco/Api/DestinationCache/GetAllDestinations/?destinations_language=en

-> No Access-Control-Allow-Origin header is present on the requested resource.
-> Test with another source that had the requested Access-Control-Allow-Origin header // see code below

        import axios from 'axios';

        class FromDest extends Component {

            state = {
                todest:[]
            }
            
            componentDidMount() {
                axios.get('https://randomuser.me/api/?results=50&nat=us,dk,fr,gb')
                .then(res => this.setState({ todest : res.data }))
            }

            render() {
                console.log(this.state.todest.results) //returns an array
                return (
                    <div className="select"></div>
                )
            }
        }

-> this code worked. Solution : save the Data in a json file (no access to the API to add the requested header)


