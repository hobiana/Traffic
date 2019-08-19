// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import CodeCouleur from '../../helpers/CodeCouleur'
import Reinput from 'reinput'

class LocaliserTrack extends React.Component {

  _localiser = () => {

  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
        <View style={{ flex: 1 }}>
        </View>
        <View style={{ flex: 8 }}>
          <KeyboardAvoidingView behavior={"padding"}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 5 }}>
                <Reinput
                  label="ID"
                  fontSize={14}
                  labelActiveColor={CodeCouleur.activeCouleur}
                  underlineActiveColor={CodeCouleur.activeCouleur}
                />
              </View>
              <View style={{ flex: 2, paddingLeft: 15, paddingTop: 8 }}>
                {/* <TouchableOpacity
                  onPress={this._localiser}
                  >
                  <Text style={styles.btnStyle}>Localiser</Text>
                </TouchableOpacity> */}
                <Button
                  onPress={this._toMapSelect}
                  style={styles.text}
                  title='Localiser'
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={{ flex: 1 }}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnStyle: CodeCouleur.btnStyle
})

export default LocaliserTrack