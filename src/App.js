import React, { Component } from 'react';
import RealTime from './page/RealTime'
import Warning from './page/Warning'
import Views from './views'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
               <Warning/>
            </div>
        );
    }
}

export default App;
