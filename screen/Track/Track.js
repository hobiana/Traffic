// Components/Test.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LocalisationNavigation from '../../Navigation/LocalisationNavigation'

class Track extends React.Component {

  render() {
    return (
      <LocalisationNavigation />
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

export default Track