import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configurestore'

export default class App extends React.Component {
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
