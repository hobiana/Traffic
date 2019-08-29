// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  Image
} from 'react-native'
import MapView from 'react-native-maps'
// import MapViewDirections from 'react-native-maps-directions';
// import Apikey from '../../API/ApiKey'

class FicheCovoiturage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {}
    }

    this.origin = {
      latitude: -18.9841083,
      longitude: 47.5362746,
    };

    this.destination = {
      latitude: -18.9188737,
      longitude: 47.5263146,
    };
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.details_container}>
          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Départ :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text} numberOfLines={2}>Mahamasina, Antananarivo, Madagascar</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Arrivée :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text} numberOfLines={6}>Mahamasina</Text>
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

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Date et heure :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>2019-08-01 08:00</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Button
                onPress={() => {
                  this.props.navigation.goBack()
                }}
                title="Covoiturage"
              />
            </View>
          </View>


        </View>
        <View style={styles.map_container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -18.9841083,
              longitude: 47.5362746,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >

            <MapView.Marker
              title={"Départ"}
              coordinate={this.origin} />

            <MapView.Marker
              title={"Arrivée"}
              coordinate={this.destination}
            >
              <Image source={require('../../images/ic_flag_finish.png')} style={{ height: 35, width: 35 }} />
            </MapView.Marker>
          </MapView>
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
    width: Dimensions.get('window').width - 4,
    height: Dimensions.get('window').width * 2 / 3,
    zIndex: 5,
    borderRadius: 5
  },
  ligne: {
    flexDirection: 'row',
    flex: 1
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
    paddingLeft: 10,
    textAlign: 'center'
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
    flex: 3
  }
})

export default FicheCovoiturage