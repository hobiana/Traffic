// Components/Test.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'

class MapPosition extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null
    }
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 1, longitudeDelta: 1 } });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Double cliquer pour marquer.
        </Text>

        {
          this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :
            this.state.hasLocationPermissions === false ?
              <Text>Location permissions are not granted.</Text> :
              this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <MapView
                  style={{ alignSelf: 'stretch', height: 400 }}
                  region={this.state.mapRegion}
                  onRegionChange={this._handleMapRegionChange}
                />
        }

        <Text>
          Location: {this.state.locationResult}
        </Text>
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
});

export default MapPosition


// // Components/Test.js

// import React from 'react'
// import { StyleSheet, View, Text } from 'react-native'
// import * as Permissions from 'expo-permissions'
// import * as Location from 'expo-location'
// import MapView from 'react-native-maps'

// class MapPosition extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       mapRegion: {
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421
//       },
//       hasLocationPermissions: false,
//       locationResult: null,
//       isFirstLocation: true
//     }
//   }

//   componentDidMount() {
//     console.log('didmount')
//     //this._getLocationAsync();
//   }

//   _handleMapRegionChange = mapRegion => {
//     console.log(mapRegion);
//     this.setState({ mapRegion });
//   };

//   _getLocationAsync = async () => {
//     // let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     // if (status !== 'granted') {
//     //   this.setState({
//     //     locationResult: 'Permission to access location was denied',
//     //   });
//     // } else {
//     //   this.setState({ hasLocationPermissions: true });
//     // }

//     // if (this.state.isFirstLocation) {
//     //   console.log('atooo')
//     //   let location = await Location.getCurrentPositionAsync({});
//     //   this.setState({ locationResult: JSON.stringify(location) });
//     //   console.log('location', location)
//     //   console.log('locationResult', this.state.locationResult)
//     //   this.setState({
//     //     mapRegion: {
//     //       latitude: location.coords.latitude,
//     //       longitude: location.locationResult.coords.longitude,
//     //       latitudeDelta: 1,
//     //       longitudeDelta: 1
//     //     }
//     //   });

//     //   this.setState({ isFirstLocation: false });
//     // }
//   };

//   render() {
//     console.log('render')
//     console.log('render isFirst', this.state.isFirstLocation)
//     console.log('render mapregion', this.state.mapRegion)
//     console.log('----------------')
//     return (
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>
//           Double cliquer pour marquer.
//         </Text>

//         {
//           this.state.locationResult === null ?
//             <Text>Finding your current location...</Text> :
//             this.state.hasLocationPermissions === false ?
//               <Text>Location permissions are not granted.</Text> :

//               <MapView
//                 style={{ alignSelf: 'stretch', flex: 1 }}
//                 region={this.state.mapRegion}
//                 onRegionChange={this._handleMapRegionChange}
//               />
//         }

//         <Text>
//           Location: {this.state.locationResult}
//           Mapregion: {this.state.mapRegion}
//         </Text>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
// });

// export default MapPosition