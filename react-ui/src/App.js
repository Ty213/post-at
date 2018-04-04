import React, { Component } from 'react';
import Postat from './Postat';
import Welcome from './Welcome';
import SubmitPostat from './SubmitPostat';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const _ = require('lodash');

class App extends Component {
    constructor(props) {
      super(props);
      this.setLocation = this.setLocation.bind(this);
      this.state = {
        loc: null,
        smiles: null,
        byTime: null
      }
    }

    getLocation() {
      console.log("get location ran");
      if(sessionStorage.lng && sessionStorage.lat) {
        let location = [];
        location.push(sessionStorage.lng);
        location.push(sessionStorage.lat);
        this.setState({loc: location});
      }
      navigator.geolocation.getCurrentPosition(this.setLocation);
    }
    setLocation(position) {
      let location = [];
      location.push(position.coords.longitude);
      location.push(position.coords.latitude);
      sessionStorage.lng = position.coords.longitude;
      sessionStorage.lat = position.coords.latitude;
      this.setState({loc: location});
      this.getPostats();   
    }

    getPostats(){
      console.log("get postats ran");
      fetch(`/api/${sessionStorage.lng},${sessionStorage.lat}`)
        .then(res => res.json())
        .then(postats => this.setState({ postats }))
        .then(() => this.sortPostats());
        
    }
    sortPostats() {
      var smiles = _.orderBy(this.state.postats.results, ['smile'], ['desc']);
      var byTime = _.orderBy(this.state.postats.results, ['_id'], ['desc']);
      this.setState({ smiles });
      this.setState( {byTime} );
    }


  render() {
    if(sessionStorage.lng && sessionStorage.lat) {
      return(
        <Router>
        <div className="App">
        <Header />
        <Route 
        exact path='/'
        render={(props) => <Welcome {...props} getLocation={this.getLocation.bind(this)}/>}
        />
        <Route 
          path="/postat" 
          render={(props) => <Postat {...props} postats= {this.state.byTime} getPostats={this.getPostats.bind(this)} />} 
        />
        </div>
        </Router>
      )
    }
      return (
        <Router>
        <div className="App">
        <Route 
       exact path='/'
        render={(props) => <Welcome {...props} getLocation={this.getLocation.bind(this)}/>}
        />
         <Route 
          path="/postat" 
          render={(props) => <Postat {...props} postats= {this.state.byTime} getPostats={this.getPostats.bind(this)} />} 
        />
        </div>
        </Router>
      );
    }

    
}

export default App;

function Header() {
  return(
    <div className="header color-change-4x">
    <div className="headerIcon">
    <h1>@</h1>
    </div>
    </div>
  )
}











// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       postats: null,
//       fetching: true
//     };
//   }

//   componentDidMount() {
//     fetch('/api/postats')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`status ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(json => {
//         this.setState({
//           postats: json.message,
//           fetching: false
//         });
//       }).catch(e => {
//         this.setState({
//           message: `API call failed: ${e}`,
//           fetching: false
//         });
//       })
//   }

//   render() {
//     return (
//       <div className="App">
//         <p className="App-intro"></p>
//         <p className="App-intro">
//           {this.state.fetching
//             ? 'Fetching message from API'
//             : this.state.message}
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
