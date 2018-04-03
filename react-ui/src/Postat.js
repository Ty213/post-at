import React, { Component } from 'react';



class Postat extends Component {
  state = {
    postats: [],
    location: {lng: sessionStorage.lng,
      lat: sessionStorage.lat}
  }

  componentDidMount() {
    this.getPostats();
  }

  getPostats(){
    fetch(`/api/${this.state.location.lng},${this.state.location.lat}`)
      .then(res => res.json())
      .then(postats => this.setState({ postats }));
  }

  updateEmoji(emoji,id) {
    fetch(`/api/postats/${id}/${emoji}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    }).then(() => this.getPostats());
  }

  render() {
    if(this.state.postats.results) {
      return(
        this.state.postats.results.map((postat) => {
          return(
            <div className="postat">
            <p key={postat._id}>{postat.text}</p>
            <div className="postat__emoji">
            <div onClick={(e) => this.updateEmoji('smile',postat._id)}>
            <i  className="far fa-smile"></i> <span className="postat__counter">{postat.smile} </span> 
            </div>
            <div onClick={(e) => this.updateEmoji('frown',postat._id)}>
            <i  className="far fa-frown"></i> <span className="postat__counter">{postat.frown}</span>
            </div>
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