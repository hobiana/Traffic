// Animations/FadeIn.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class FadeInRight extends React.Component {

  constructor(props) {
    super(props)
    let depart = 0 - Dimensions.get('window').width;
    this.state = {
      positionLeft: new Animated.Value(depart)
    }
  }

  componentDidMount() {
    Animated.spring(
      this.state.positionLeft,
      {
        toValue: 0
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{ left: this.state.positionLeft }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default FadeInRight