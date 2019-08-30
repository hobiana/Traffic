import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MapInput from './MapInput';
import MyMapView from './MyMapView';
import { getLocation } from './LocationService';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import TrafficApi from '../../API/TrafficAPI'

class MapContainer extends React.Component {
  state = {
    region: {},
    positionMarker: {}
  };

  componentDidMount() {
    this.getInitialState();
  }

  getInitialState() {
    getLocation().then(data => {
      this.updateState({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });
  }

  updateState(location) {
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      positionMarker: {
        latitude: location.latitude,
        longitude: location.longitude,
        nameLocation: location.name,
      }
    });
  }

  getCoordsFromName(loc, name) {
    this.updateState({
      latitude: loc.lat,
      longitude: loc.lng,
      name: name
    });
  }

  onMapRegionChange(region) {
    // console.log('region', region)
    this.setState({ region });
  }

  render() {


    //console.log('haha', this.state.region['latitude'])
    //console.log("mapcontainer", this.props)
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          marginLeft: 10,
          marginRight: 10,
          width: Dimensions.get('window').width - 20,
          height: 150,
          zIndex: 5,
          backgroundColor: 'transparent'
        }}>
          <MapInput notifyChange={(loc,name) => this.getCoordsFromName(loc,name)} />
        </View>

        <View style={styles.map}>
          {this.state.region['latitude'] ? (
            <View
              style={{
                flex: 1
              }}
            >
              <MyMapView
                region={this.state.region}
                onRegionChange={reg => this.onMapRegionChange(reg)}
                positionmarker={this.state.positionMarker}
              />
            </View>
          ) : null
          }
        </View>

        <View style={{
          position: 'absolute',
          width: 60,
          height: 60,
          right: 30,
          bottom: 30,
          borderRadius: 30,
          backgroundColor: '#e91e63',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5
        }}>
          <TouchableOpacity
            onPress={() => {

              console.log("value positionMarker",this.state.positionMarker)
              this.props.editValue(this.state.positionMarker)
              this.props.navigateGoback.goBack();
            }}
          >
            <FontAwesome
              name="check"
              style={{
                fontSize: 40,
                color: '#fff'
              }}
            />
          </TouchableOpacity>

        </View>
      </View>
    );
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

export default MapContainer;
