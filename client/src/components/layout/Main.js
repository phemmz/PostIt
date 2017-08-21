import React, { Component} from 'react';
import NavigationBar from './NavigationBar';

class Main extends Component {
    render() {
    	return (
    		<div className="landing-background">
          <NavigationBar />
          <div className="container-fluid">
            {this.props.children}
          </div>
        </div>
      );
    }
}

export default Main