import React, { Component } from 'react';


class Postat extends Component {
  state = {postats: []}

  componentDidMount() {
  }

  render() {
      return(
    <div>Hello from Postat</div>
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