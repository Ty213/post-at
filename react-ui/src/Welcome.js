import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Welcome extends Component {

  render() {
      return(
        <div className="welcome color-change-4x">
            <div className="welcome__wrapper">
                <div className="welcome__title">@</div>
                <div className="welcome__text">
                    <p>With Post@ you can leave anonymous messages wherever you're at and read messages
                        other people have left.</p>
                    <ul>
                        <i>
                        <li>Post a review at a resturaunt</li>
                        <li>Leave your mark at the park</li>
                        <li>Leave a secret in the desert</li>
                        </i>
                    </ul>
                    <p> No usernames or passwords here! We just need your current location to get started.</p>
                    <Link to="/postat"><button className="vibrate-2" onClick={this.props.getLocation}>Share location</button></Link>
                </div>
            </div>
        </div>
      )
  }
}

export default Welcome;