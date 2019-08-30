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
} from 'react-native'
import Reinput from 'reinput'
import CodeCouleur from '../../helpers/CodeCouleur'
import DatePicker from 'react-native-datepicker'
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment'

class PropositionCovoiturage extends React.Component {

  constructor(props) {
    super(props)
    this.nbpassager = 0;

    let date = moment(new Date()).format('YYYY-MM-DD');
    let time = moment(new Date()).format('HH:mm');

    this.state = {
      coordDep: {},
      nameLocDep: '',
      coordArriv: {},
      nameLocArriv: '',
      date: date,
      time: time
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

  _proposer = () => {
    console.log("proposer", this.state)

  }

  _tobestItineraire = () => {
    console.log("to itineraire")
     this.props.navigation.navigate('ItineraireCovoiturage', { origin:this.state.coordDep, destination: this.state.coordArriv })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
        <View style={{ flex: 1 }}>
        </View>
        <View style={{ flex: 8 }}>
          <KeyboardAvoidingView behavior={"padding"}>
            <ScrollView>
              <View style={{ flexDirection: 'row' }}>
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
                      source={require('../../images/ic_position.png')}
                      style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>


              <Reinput
                label="Ville de départ"
                fontSize={14}
                labelActiveColor={CodeCouleur.activeCouleur}
                underlineActiveColor={CodeCouleur.activeCouleur}
                value={this.state.nameLocDep}
                onChangeText={(text) => this._villeDepChangeText(text)}
              />

              <View style={{ flexDirection: 'row' }}>
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
                      source={require('../../images/ic_position.png')}
                      style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>

              <Reinput
                label="Ville d'arrivée"
                fontSize={14}
                labelActiveColor={CodeCouleur.activeCouleur}
                underlineActiveColor={CodeCouleur.activeCouleur}
                value={this.state.nameLocArriv}
                onChangeText={(text) => this._villeArrivChangeText(text)}
              />

              <Reinput
                label="Nombre de passager"
                keyboardType='numeric'
                fontSize={14}
                labelActiveColor={CodeCouleur.activeCouleur}
                underlineActiveColor={CodeCouleur.activeCouleur}
                onChangeText={(text) => this._nbpassagerChangeText(text)}
              />

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <DatePicker
                    style={{ width: 150, marginBottom: 15 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="Choisir date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                      }
                    }}
                    onDateChange={(date) => {
                      {/* let d = date.split("T")
                    console.log(d) */}
                      this.setState({ date: date })
                    }}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <DatePicker
                    style={{ width: 150, marginBottom: 15 }}
                    date={this.state.time}
                    mode="time"
                    placeholder="Choisir date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                      }
                    }}
                    onDateChange={(time) => { this.setState({ time: time }) }}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this._tobestItineraire()}
              >
                <View style={{ marginBottom: 15 }}>
                  <Text style={CodeCouleur.btnStyle}>Voir la meilleure itinéraire <MaterialIcons name="directions" style={{ fontSize: 16 }} /></Text>
                </View>
              </TouchableOpacity>



              <Button
                onPress={this._proposer}
                style={styles.btnProposer}
                title='Proposer'
                type="outline"
                buttonStyle={{
                  backgroundColor: 'transparent'
                }}
              />

            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={{ flex: 1 }}>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  form_container: {
    paddingTop: 15
  }
})

export default PropositionCovoiturage