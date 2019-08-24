// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import MapContainer from '../../components/MapPlace/MapContainer'

class MapPosition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {},
    }
    // this.position = {};
  }

  render() {
    //console.log("MapPosition",this.props.navigation)
    const functionReturn = this.props.navigation.state.params.returnFunction; // azo avy @ navigation izay halefa avany @ fiche position na izay miantso anazy
    return (
      <View style={styles.container}>
        <MapContainer
          editValue={functionReturn}
          navigateGoback={this.props.navigation}
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

export default MapPosition


