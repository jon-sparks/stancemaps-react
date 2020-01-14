import React from 'react';
import Map from './components/map';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            allBumps: {}

        }

        fetch('/bumps')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allBumps: data
                })
            })


    }

    render() {
        return (
            <div className="App" style={{display:'flex'}}>
                <Map
                    apikey="HnSYQXJYOLQAGFkthNCjSYdKzEjwrfxthpOqhcL5gSQ"
                    lat="42.345978"
                    lng="-83.0405"
                    zoom="12"
                    allBumps={this.state.allBumps}
                />
            </div>
        );
    }
}

export default App;
