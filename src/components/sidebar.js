import React from 'react';
// eslint-disable-next-line

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }



    render() {
        return (
            <div style={{height:'100vh', width:'400px', background:'white', boxShadow:'5px 0px 20px -10px rgba(0,0,0,0.3)', zIndex:'1'}}></div>
        );
    }
}

export default Sidebar;
