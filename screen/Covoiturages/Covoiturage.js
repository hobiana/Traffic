// Components/Test.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import CovoiturageNavigation from '../../Navigation/CovoiturageNavigation'

class Covoiturage extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <CovoiturageNavigation />
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {

  }
})

export default Covoiturage