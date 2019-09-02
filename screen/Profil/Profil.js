// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import CodeCouleur from '../../helpers/CodeCouleur'
import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class Profil extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      id: ''
    }
  }

  _disconnect = async () => {
    await AsyncStorage.removeItem('user_connected');
    await SecureStore.deleteItemAsync('secure_token')
    this.props.navigation.navigate('Login')
  }

  async componentDidMount() {
    var user = await AsyncStorage.getItem('user_connected');
    user = JSON.parse(user)
    this.setState({
      name: user.name,
      id: user.userId,
      email: user.email
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.profilimage_container}>
          <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
            <FontAwesome name="user" style={styles.user} />
            <Text style={{ textAlign: 'center', fontSize: 20 }}>{this.state.name}</Text>
          </View>
        </View>

        <View style={styles.subview_container}>
          <View style={styles.line_profil}>
            <View style={styles.icon_container}>
              <MaterialCommunityIcons name="account-key" style={{ fontSize: 30, color: CodeCouleur.activeCouleur, justifyContent: 'center' }} />
            </View>
            <View style={styles.details_container}>
              <Text style={{ fontSize: 20 }}> {this.state.id}</Text>
            </View>
          </View>

          <View style={styles.line_profil}>
            <View style={styles.icon_container}>
              <MaterialIcons name="email" style={{ fontSize: 30, color: CodeCouleur.activeCouleur, justifyContent: 'center' }} />
            </View>
            <View style={styles.details_container}>
              <Text style={{ fontSize: 20 }}> {this.state.email}</Text>
            </View>
          </View>
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
              console.log("disconnect")
              this._disconnect()
            }}
          >
            <MaterialCommunityIcons
              name="logout"
              style={{
                fontSize: 40,
                color: '#fff'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
  profilimage_container: {
    flex: 1,
    alignItems: 'center'
  },
  subview_container: {
    flex: 3,
    flexDirection: 'column'
  },
  user: {
    textAlign: 'center',
    backgroundColor: '#593d7b',
    fontSize: 100,
    justifyContent: 'flex-end',
    color: '#fff',
    width: 130,
    height: 130,
    borderRadius: 62,
    paddingTop: 12
  },
  line_profil: {
    height: 60,
    flexDirection: 'row',
    // paddingLeft: 10,
    // paddingRight: 10,
    justifyContent: 'center'
  },
  icon_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'center'
  },
  icon: {
    color: CodeCouleur.activeCouleur,
    fontSize: 15,
    alignItems: 'center'
  },
  details_container: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontSize: 100
  }
})

export default Profil