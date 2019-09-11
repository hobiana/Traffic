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
  ActivityIndicator,
  Alert
} from 'react-native'
import CodeCouleur from '../../helpers/CodeCouleur'
import Reinput from 'reinput'
import TrackList from '../../components/Tracking/TrackList'
import AntDesign from '@expo/vector-icons/AntDesign'
import {
  getTracks,
  ajouterTracks
} from '../../API/TrafficAPI'
import { AsyncStorage } from 'react-native';

class LocaliserTrack extends React.Component {
  constructor(props) {
    super(props)
    this.idUserText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      tracks: [],
      isLoading: false
    }
  }

  async componentDidMount() {
    var user = await AsyncStorage.getItem('user_connected');
    user = JSON.parse(user)
    getTracks(user.userId).then(async rep => {
      this.setState({
        tracks: [...this.state.tracks, ...rep.data],
        isLoading: false
      })
    })
  }

  _loadListPerson = async () => { // izay fonction misy anio fleche io dia vo bind automatic ary afaka ampiasana any @ components hafa
    this.setState({ isLoading: true })
    ajouterTracks(this.idUserText).then(async (rep) => {
      console.log("vita ajout track")
      if (rep.status == 201) {
        var user = await AsyncStorage.getItem('user_connected');
        user = JSON.parse(user)
        console.log("vita maka user connecte", user)
        getTracks(user.userId).then(rep => {
          console.log("vita final")
          this.setState({
            tracks: [...this.state.tracks, ...rep.data],
            isLoading: false
          })
        })
      }
    });
    // }
  }

  _searchTextInputChanged(text) {
    this.idUserText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color={CodeCouleur.fondCouleur} />
          {/* Le component ActivityIndicator possède une propriété size pour 
            définir la taille du visuel de chargement : small ou large. Par défaut 
            size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }

  _addPersonToTrack = () => {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        tracks: []
      }, () => {
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre person : " + this.state.tracks.length)
        this._loadListPerson()
      })
  }

  _localiser = () => {

  }

  render() {
    console.log("******* render list track *********************")
    return (
      <View style={styles.main_container}>
        <View style={styles.localise_container}>
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
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._addPersonToTrack()}
                  />
                </View>
                <View style={{ flex: 2, paddingLeft: 15, paddingTop: 8 }}>
                  <TouchableOpacity
                    onPress={this._addPersonToTrack}
                  >
                    <Text style={styles.btnStyle}><AntDesign name="pluscircleo" /> Localiser</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={{ flex: 1 }}>
          </View>
        </View>
        <View style={styles.persons_container}>
          <TrackList
            tracks={this.state.tracks}
            navigation={this.props.navigation}
            loadListPerson={this._loadListPerson}
            page={this.page}
            totalPages={this.totalPages}
          />
          {this._displayLoading()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column'
  },
  btnStyle: CodeCouleur.btnStyle,
  localise_container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5
  },
  persons_container: {
    flex: 8
  },
  loading_container: {
    flex: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LocaliserTrack