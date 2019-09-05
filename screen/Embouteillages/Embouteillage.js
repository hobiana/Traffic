// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from 'react-native'
import Reinput from 'reinput'
import CodeCouleur from '../../helpers/CodeCouleur'
import EmbouteillageList from '../../components/Embouteillage/EmbouteillageList'
import {
  getTraffic
} from '../../API/TrafficAPI'

class Embouteillage extends React.Component {
  constructor(props) {
    super(props)
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      coordDep: {
        //"lat": -18.9188737,
        //"lon": 47.5263146,
      },
      nameLocDep: '',
      coordArriv: {
        //"lat": -18.9859782,
        //"lon": 47.532721,
      },
      nameLocArriv: '',
      embouteillages: []
    }
  }

  _villeDepChangeText = (text) => {
    this.setState({
      nameLocDep: text
    })
  }

  _villeArrivChangeText = (text) => {
    this.setState({
      nameLocArriv: text
    })
  }

  _nbpassagerChangeText = (text) => {
    this.nbpassager = text;
  }

  //set value auto
  _departChangeValueFromMapPosition = (value) => {
    console.log("hahahahahahah")
    this.setState({
      coordDep: {
        lat: value.latitude,
        lon: value.longitude
      },
      nameLocDep: value.nameLocation
    })
  }

  _arriveeChangeValueFromMapPosition = (value) => {
    this.setState({
      coordArriv: {
        lat: value.latitude,
        lon: value.longitude
      },
      nameLocArriv: value.nameLocation
    })
  }
  //tapitra set value auto

  _toMapSelect = (func) => {
    this.props.navigation.navigate('MapPosition', { returnFunction: () => func })
    console.log(this.villeDep)
    console.log(this.villeArriv)
    console.log(this.state)
  }

  _loadEmbouteillages = () => {

    console.log(this.state.coordDep)
    console.log(this.state.coordArriv)
    if (typeof this.state.coordDep.lat != 'undefined' && typeof this.state.coordArriv.lat) {
      this.setState({ isLoading: true })
      let origin = this.state.coordDep.lat + "," + this.state.coordDep.lon;
      let destination = this.state.coordArriv.lat + "," + this.state.coordArriv.lon;
      getTraffic(origin, destination).then(rep => {
        this.setState({
          embouteillages: [...this.state.embouteillages, ...rep.data],
          isLoading: false
        })
      })
    } else {
      Alert.alert(
        'Erreur',
        'Remplisser les coordonnées de départ et d\'arriver'
      )
    }

  }

  _searchEmbouteillages = () => {
    this.page = 0;
    this.totalPages = 0;
    console.log(this.state)
    this.setState({
      embouteillages: []
    }, () => {
      this._loadEmbouteillages()
    })
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.search_container}>
          <View style={{ flex: 1 }}>
          </View>
          <View style={{ flex: 8 }}>
            <View style={{ flexDirection: 'row', marginBottom: -17 }}>
              <View style={{ flex: 10 }}>
                <Reinput
                  label="Coordonnées de départ"
                  fontSize={14}
                  editable={false}
                  labelActiveColor={CodeCouleur.activeCouleur}
                  underlineActiveColor={CodeCouleur.activeCouleur}
                  value={JSON.stringify(this.state.coordDep)}
                />
              </View>
              <View style={{ flex: 2, paddingLeft: 15, paddingTop: 5 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('MapPosition', { returnFunction: this._departChangeValueFromMapPosition })}
                >
                  <Image
                    source={require('../../assets/ic_position.png')}
                    style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>


            {/* <Reinput
                  label="Ville de départ"
                  fontSize={14}
                  labelActiveColor={CodeCouleur.activeCouleur}
                  underlineActiveColor={CodeCouleur.activeCouleur}
                  value={this.state.nameLocDep}
                  onChangeText={(text) => this._villeDepChangeText(text)}
                /> */}

            <View style={{ flexDirection: 'row', marginBottom: -17 }}>
              <View style={{ flex: 10 }}>
                <Reinput
                  label="Coordonnées d'arrivée"
                  fontSize={14}
                  editable={false}
                  labelActiveColor={CodeCouleur.activeCouleur}
                  underlineActiveColor={CodeCouleur.activeCouleur}
                  value={JSON.stringify(this.state.coordArriv)}
                />
              </View>
              <View style={{ flex: 2, paddingLeft: 15, paddingTop: 5 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('MapPosition', { returnFunction: this._arriveeChangeValueFromMapPosition })}
                >
                  <Image
                    source={require('../../assets/ic_position.png')}
                    style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* <Reinput
                  label="Ville d'arrivée"
                  fontSize={14}
                  labelActiveColor={CodeCouleur.activeCouleur}
                  underlineActiveColor={CodeCouleur.activeCouleur}
                  value={this.state.nameLocArriv}
                  onChangeText={(text) => this._villeArrivChangeText(text)}
                /> */}

            <Button
              onPress={() => {
                this._searchEmbouteillages()
              }}
              style={styles.btnProposer}
              title='Voir le traffic'
              type="outline"
              buttonStyle={{
                backgroundColor: 'transparent'
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
          </View>
        </View>




        <View style={styles.liste_container}>
          <EmbouteillageList
            embouteillages={this.state.embouteillages}
            navigation={this.props.navigation}
            loadEmbouteillages={this._loadEmbouteillages}
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
  form_container: {
    paddingTop: 15
  },
  search_container: {
    flex: 1,
    flexDirection: 'row'
  },
  liste_container: {
    flex: 3
  }
})

export default Embouteillage