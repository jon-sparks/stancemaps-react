import React from 'react';
import styled from 'styled-components';

const Side = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 400px;
    background: white;
    boxShadow: 5px 0px 20px -10px rgba(0,0,0,0.3);
    padding: 25px;
    z-index: 1;
`;
const Input = styled.input`
    box-shadow: inset 0 -2px 0 0 magenta;
    background: white;
    border: none;
    padding: 15px;
    font-size: 16px;
    z-index: 1;
`;
// eslint-disable-next-line

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            from:'',
            to:''
        }
    }



    render() {
        return (
            <Side>
                <Input placeholder="From" onChange={(e) => {
                    this.setState({
                        from:e.currentTarget.value
                    })
                } }/>
                <Input placeholder="To" onChange={(e) => {
                    this.setState({
                        to:e.currentTarget.value
                    })
                } }/>
                <button>Go</button>
            </Side>
        );
    }
}

export default Sidebar;
