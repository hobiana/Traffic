import './fixtimerbug';

import React from 'react';
import { Alert, YellowBox } from 'react-native';
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configurestore'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { sendCoords } from './API/TrafficAPI'
import { AsyncStorage } from 'react-native';

export default class App extends React.Component {

  constructor() {
    super();
  }
  _sendCoords = async (userData) => {
    let location = await Location.getCurrentPositionAsync({});
    console.log("mandefa", location)
    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    const locationData = {
      "userid": userData.userId,
      "datetime": new Date(),
      "speed": location.coords.speed,
      "location": {
        "type": "Point",
        "coordinates": [location.coords.latitude, location.coords.longitude]
      }
    }
    sendCoords(locationData).then((results) => {
      console.log(results)
    })
  }

  async componentDidMount() {
    var user = await AsyncStorage.getItem('user_connected');
    console.log(user)
    this._sendCoords(user);
    setInterval(() => {
      this._sendCoords(user);
    }, 60000);
  }
  render() {
    /* async componentDidmount() {
        check si token valide anty async storage
        si valide makany @ page d'accueil props.navigation.navigate
        sinon page login
    } 
    */
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>
    )
  }
}
