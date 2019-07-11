    import React from "react";
    import {BrowserRouter as Router, Route, Link} from "react-router-dom";
    import RealTime from './page/RealTime'
    import Warning from './page/Warning'
    const BasicExample = () => (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/About">About</Link>
                    </li>
                </ul>
                <Route exact path='/' component={Home}/>
                <Route path='/About' component={About}/>
            </div>
        </Router>

    );
    const Home = () => (
        <RealTime/>
    );
    const About = () => (
        <Warning/>
    );

    export default BasicExample;
