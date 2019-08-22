// Components/Test.js

import React from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import MapView from 'react-native-maps'

class FicheCovoiturage extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.details_container}>
          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Départ :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>Mahamasina</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Arrivée :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>Mahamasina</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Places :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>5/8</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Véhicules :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>Renault</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Contact :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>+261</Text>
            </View>
          </View>
        </View>
        <View style={styles.map_container}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column'
  },
  details_container: {
    flexDirection: 'column',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    position: 'absolute',
    top: 2,
    left: 2,
    width: Dimensions.get('window').width * 2 / 3,
    height: Dimensions.get('window').width / 2,
    zIndex: 5,
    borderRadius: 5
  },
  ligne: {
    flexDirection: 'row'
  },
  map_container: {
    flex: 1
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 10
  },
  textLibelle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'right'
  },
  libelle: {
    flex: 1
  },
  data: {
    flex: 2
  }
})

export default FicheCovoiturage