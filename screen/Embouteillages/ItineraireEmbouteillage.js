// Components/Test.js

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image
} from 'react-native'
import MapView from 'react-native-maps';
import { getDirection } from '../../API/TrafficAPI'
import polyline from '@mapbox/polyline'


class ItineraireEmbouteillage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {},
            origin: {},
            destination: {},
            routes: [],
            initialRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    componentDidMount() {
        // console.log(this.props.navigation.state.params.embouteillage.routes)
        let routes = this.props.navigation.state.params.embouteillage.routes;
        routes = polyline.decode(routes)
        routes = routes.map((point, indice) => {
            return {
                latitude: point[0],
                longitude: point[1]
            }
        })

        this.setState({
            routes: routes,
            origin: {
                lat: routes[0].latitude,
                lon: routes[0].longitude,
            },
            destination: {
                lat: routes[routes.length - 1].latitude,
                lon: routes[routes.length - 1].longitude,
            },
            initialRegion: {
                latitude: routes[0].latitude,
                longitude: routes[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        })
    }

    onRegionChange = (region) => {
        console.log('onRegionChange', region);
        this.setState({
            initialRegion: region
        })
    };

    onRegionChangeComplete = (region) => {
        console.log('onRegionChangeComplete', region);
    };

    render() {
        console.log("render", this.state.routes[0])
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: -18.971814104580773,
                        longitude: 47.49535007402301,
                        latitudeDelta: 4.384841647609761,
                        longitudeDelta: 2.481059767305858,
                    }}
                    onRegionChange={this.onRegionChange}
                >
                    {this.state.routes.length > 0 ?
                        <MapView.Polyline
                            coordinates={this.state.routes}
                            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                '#7F0000',
                                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                '#B24112',
                                '#E5845C',
                                '#238C23',
                                '#7F0000'
                            ]}
                            strokeWidth={6}
                        />
                        : null
                    }
                    {typeof this.state.origin.lat === 'undefined' ?
                        null
                        : <MapView.Marker
                            title={"Départ"}
                            coordinate={{
                                latitude: this.state.origin.lat,
                                longitude: this.state.origin.lon,
                            }} />}

                    {typeof this.state.destination.lat === 'undefined' ?
                        null
                        : <MapView.Marker
                            title={"Arrivée"}
                            coordinate={{
                                latitude: this.state.destination.lat,
                                longitude: this.state.destination.lon,
                            }} >
                            <Image source={require('../../images/ic_flag_finish.png')} style={{ height: 50, width: 50 }} />
                        </MapView.Marker>
                        }
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});

export default ItineraireEmbouteillage