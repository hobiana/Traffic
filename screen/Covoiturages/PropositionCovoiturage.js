// Components/Test.js

import React from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Button, TouchableOpacity } from 'react-native'

class PropositionCovoiturage extends React.Component {

  constructor(props) {
    super(props)
  }
  
  _toMapSelect = () => {
    this.props.navigation.push('FicheCovoiturage')
    console.log(this.props)
  }

  render() {
    return (

      <KeyboardAvoidingView behavior="position" style={styles.form_container}>
        <View style={styles.inputContainer}>
          <Text>Départ</Text>
          <TextInput
            placeholder={'Pseudo'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            style={styles.input} />
        </View>

        {/* <View style={styles.inputContainer}>
                        <Feather
                            name={'lock'}
                            size={24}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder={'Mot de passe'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            secureTextEntry={!this.state.showPassword}
                            style={styles.input} />
                    </View> */}


        <Button
          onPress={this._toMapSelect}
          style={styles.text}
          title='Valider'
        />

      </KeyboardAvoidingView>
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

export default PropositionCovoiturage