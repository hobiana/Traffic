import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native'
import
MapView
    from 'react-native-maps';


export default class MyMapView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isMapReady: false,
        }
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
        console.log("map is ready!!");
    }

    render() {
        // console.log(' anaty mymapView', this.props.region)
        return (
            <View style={{ flex: 1}}>
                <MapView
                    style={styles.map}
                    region={this.props.region}
                    //showsUserLocation={true}
                    onRegionChangeComplete ={(reg) => this.props.onRegionChange(reg)}
                    onLayout={this.onMapLayout}
                >
                    {this.state.isMapReady ?
                        <MapView.Marker
                            title={this.props.title}
                            draggable
                            coordinate={{
                                latitude: this.props.positionmarker.latitude,
                                longitude: this.props.positionmarker.longitude
                            }} /> : null
                    }
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});

// export default MyMapView;