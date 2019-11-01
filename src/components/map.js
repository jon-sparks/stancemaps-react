import React from 'react';

// eslint-disable-next-line
const e = React.createElement;

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.platform = null;
        this.map = null;

        this.state = {
            apikey: this.props.apikey,
            center: {
                lat: 51.481583,
                lng: -3.179090,
            },
            zoom: 10
        }
    }

    updateLoc = (a) => {
        this.setState({
            center: {
                lat: a.coords.latitude,
                lng: a.coords.longitude
            }
        })
        this.map.setCenter({
            lat: this.state.center.lat,
            lng: this.state.center.lng
        })
    }

    componentDidMount() {

        let thisComponent = this;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                thisComponent.updateLoc(position)
            });
        } else {
          /* geolocation IS NOT available */
        }


        this.platform = new window.H.service.Platform(this.state);

        var layer = this.platform.createDefaultLayers();
        var container = document.getElementById('here-map');

        this.map = new window.H.Map(container, layer.vector.normal.map,
            {
            center: this.state.center,
            zoom: this.state.zoom,
          })

        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        var behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.map, layer)

        // window.H.Map.Options({lat:-15.829251, lng:-56.099042})


    }



    render() {
        return (
            <div id="here-map" style={{width: '100%', height: '100vh', background: 'grey' }}></div>
        );
    }
}

export default Map;
