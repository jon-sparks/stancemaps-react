import React from 'react';
import Map from './components/map';
import styled from 'styled-components';

const Input = styled.input`
    position: absolute;
    top: 10px;
    left: 10px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
    background: white;
    border: none;
    padding: 15px;
    font-size: 16px;
    z-index: 1;
`;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        fetch('/ping')
            .then(response => response.json())
            .then(data => console.log(data))


    }

    render() {
        return (
            <div className="App">
                <Input/>
                <Map
                    apikey="HnSYQXJYOLQAGFkthNCjSYdKzEjwrfxthpOqhcL5gSQ"
                    lat="42.345978"
                    lng="-83.0405"
                    zoom="12"
                />
            </div>
        );
    }
}

export default App;
