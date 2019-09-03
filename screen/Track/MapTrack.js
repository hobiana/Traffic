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
import moment from 'moment'
import {
  getPositionUserTracks
} from '../../API/TrafficAPI'
import { AsyncStorage } from 'react-native';


class MapTrack extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {},
      markers: []
    }
  }

  async componentDidMount() {
    var user = await AsyncStorage.getItem('user_connected');
    user = JSON.parse(user)
    getPositionUserTracks(user.userId).then(response => {
      console.log("getPositionUserTracks", response)
      this.setState({
        markers: response.data
      })
    })
    setInterval(() => {
      getPositionUserTracks(user.userId).then(response => {
        console.log("getPositionUserTracks", response)
        this.setState({
          markers: response.data
        })
      })
    }, 60000)
  }

  render() {
    console.log("render")
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
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={{
                latitude: marker.position[0].location.coordinates[0],
                longitude: marker.position[0].location.coordinates[1]
              }}
              title={marker.firstName}
            >
              <MapView.Callout>
                <View styles={styles.marker_container}>
                  <Text style={styles.marker}>
                    {marker.lastName} {moment(marker.position[0].dateTime).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}

        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  marker_container: {
    // marginTop: 15
  },
  marker: {
    backgroundColor: '#3498eb',
    padding: 5,
    borderRadius: 5,
    color: '#fff'
  },
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

export default MapTrack