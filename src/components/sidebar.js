import React from 'react';


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
