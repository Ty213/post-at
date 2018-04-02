import React, { Component } from 'react';



class Postat extends Component {
  state = {
    postats: [],
    location: {lng: sessionStorage.lng,
      lat: sessionStorage.lat}
  }

  componentDidMount() {
    fetch(`/api/${this.state.location.lng},${this.state.location.lat}`)
      .then(res => res.json())
      .then(postats => this.setState({ postats }));
  }

  render() {
    if(this.state.postats.results) {
      return(
        this.state.postats.results.map((postat) => {
          return(
            <div className="postat">
            <p key={postat._id}>{postat.text}</p>
            <div className="postat__emoji">
            <i class="far fa-smile"></i> {postat.smile}<br />
            <i class="far fa-frown"></i> {postat.frown}
            </div>
            <hr />
            </div>
            
          ) 
        })
      )
    }
      return(
    <div>No Post@s at here. Start the party!</div>
      )
  }
}

export default Postat;

//-75.022692, 39.840271


// if(this.state.postats.postats) {
//     return (
//       <div className="App">
//         <div> 
//         <h1 className=" title rotate-center">@</h1>
//         </div>
//         {console.log(this.state.postats.postats)}
//         {this.state.postats.postats.map((postat) => {
//           return <h2 key={postat._id}>{postat.text}</h2>
//         })}
//       </div>
//     );
//   }
//   return (
//     <div> Loading? Maybe..? probably... </div>  
//    )