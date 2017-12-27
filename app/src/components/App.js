import React, {Component} from 'react';

export default class App extends Component {

    render() {
        const content = <div className="app-inner-div">Hi! I am Boiler!</div>;

        return (
            <div className="app-div">
                {content}
            </div>
        )
    }
}
