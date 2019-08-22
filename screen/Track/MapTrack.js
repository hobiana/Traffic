// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import
MapView
  from 'react-native-maps';

class MapTrack extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {},
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
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

export default MapTrack