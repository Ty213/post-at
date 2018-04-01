import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {postats: []}

  componentDidMount() {
    fetch('/api/postats')
      .then(res => res.json())
      .then(postats => this.setState({ postats }));

  }

  render() {
    if(this.state.postats.postats) {
      return (
        <div className="App">
          <div> 
          <h1 className=" title rotate-center">@</h1>
          </div>
          {console.log(this.state.postats.postats)}
          {this.state.postats.postats.map((postat) => {
            return <h2 key={postat._id}>{postat.text}</h2>
          })}
        </div>
      );
    }
    return (
      <div> Loading? Maybe..? probably... </div>  
     )
    
  }
}

export default App;




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
