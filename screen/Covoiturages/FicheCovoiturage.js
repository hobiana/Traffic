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
import moment from 'moment'
import polyline from '@mapbox/polyline'

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
    const covoiturage = this.props.navigation.state.params.covoiturage;
    let coords = polyline.decode(covoiturage.routes)
    let routes = coords.map((point, indice) => {
      return {
        latitude: point[0],
        longitude: point[1]
      }
    })
    return (
      <View style={styles.main_container}>
        <View style={styles.details_container}>
          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Départ :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text} numberOfLines={2}>{covoiturage.departure.name}</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Arrivée :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text} numberOfLines={6}>{covoiturage.arrival.name}</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Places :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>{covoiturage.passengers.length}/{covoiturage.totalPassengers}</Text>
            </View>
          </View>

          {/* <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Véhicules :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>Renault</Text>
            </View>
          </View> */}

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Contact :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>{covoiturage.clientPurpose.email}</Text>
            </View>
          </View>

          <View style={styles.ligne}>
            <View style={styles.libelle}>
              <Text style={styles.textLibelle}>Date et heure :</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>{moment(covoiturage.dateTime).format('YYYY-MM-DD HH:mm')}</Text>
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
              latitude: -18.971814104580773,
              longitude: 47.49535007402301,
              latitudeDelta: 4.384841647609761,
              longitudeDelta: 2.481059767305858,
            }}
          //onRegionChange={this.onRegionChange}
          >
            <MapView.Polyline
              coordinates={routes}
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

            <MapView.Marker
              title={"Départ"}
              coordinate={{
                latitude: covoiturage.departure.location.coordinates[0],
                longitude: covoiturage.departure.location.coordinates[1],
              }} />

            <MapView.Marker
              title={"Arrivée"}
              coordinate={{
                latitude: covoiturage.arrival.location.coordinates[0],
                longitude: covoiturage.arrival.location.coordinates[1],
              }} >
              <Image source={require('../../images/ic_flag_finish.png')} style={{ height: 50, width: 50 }} />
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