import React from 'react';
import bumpIcon from '../bumpicon.png';

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
            zoom: 10,
            allBumps: this.props.allBumps
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
                // console.log(thisComponent)
                let currentPosMarker = new window.H.map.Marker({lat:position.coords.latitude, lng:position.coords.longitude});
                thisComponent.map.addObject(currentPosMarker);
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
        // console.log(window.H.map)

        this.map.addEventListener('longpress', function(ev) {
            let newCoords = ev.target.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY)
            let newSpeedbump = new window.H.map.Marker({lat:newCoords.lat, lng:newCoords.lng});
            newSpeedbump.draggable = true
            thisComponent.map.addObject(newSpeedbump);
        });

        // disable the default draggability of the underlying map
        // and calculate the offset between mouse and target's position
        // when starting to drag a marker object:
        this.map.addEventListener('dragstart', function(ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof window.H.map.Marker) {

                // console.log(this)
                var targetPosition = this.geoToScreen(target.getGeometry());
                // console.log(targetPosition)
                target['offset'] = new window.H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
            }
        }, false);


        // re-enable the default draggability of the underlying map
        // when dragging has completed
        this.map.addEventListener('dragend', function(ev) {
            var target = ev.target;
            if (target instanceof window.H.map.Marker) {
            behavior.enable();
            }
        }, false);

        // Listen to the drag event and move the position of the marker
        // as necessary
        this.map.addEventListener('drag', function(ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof window.H.map.Marker) {
            target.setGeometry(this.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
            }
        }, false);


            
    }

    //update allBumps state when props are updated.
    static getDerivedStateFromProps(nextProps, prevState){
        return({allBumps: nextProps.allBumps})
    }

    componentDidUpdate(){

        // Define the icon image for speed bumps
        // let bumpIcon = new window.H.map.Icon("../bumpicon.png", {anchor: {x:15,y:15}});
        // console.log(bumpIcon)

        if(this.state.allBumps.length > 0){
            Object.values(this.state.allBumps).forEach(value => {
                let bumpMarker = new window.H.map.Marker({lat:value.lat, lng:value.lon});
                this.map.addObject(bumpMarker);
            });
        }


    }

    render() {
        return (
            <div id="here-map" style={{width: '100%', height: '100vh', background: 'grey' }}></div>
        );
    }
}

export default Map;
