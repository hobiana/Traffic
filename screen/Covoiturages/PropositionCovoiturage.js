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
  TouchableOpacity,
} from 'react-native'
import Reinput  from 'reinput'
import CodeCouleur from '../../helpers/CodeCouleur'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class PropositionCovoiturage extends React.Component {

  constructor(props) {
    super(props)
    this.villeDep = "";
    this.villeArriv = "";
    this.nbpassager = 0;

    let date = moment(new Date()).format('YYYY-MM-DD');
    let time = moment(new Date()).format('HH:mm');

    this.state = {
      coordDep: '',
      coordArriv: '',
      date: date,
      time: time
    }
  }

  // _splitDateTime(datetime){
  //   console.log(datetime)
  //   let d=datetime.split("T");
  //   let rep = [];
  //   rep.push(d[0]); //date

  //   let time=d[1].split(".");
  //   rep.push(time[0]);
  //   return rep;
  // }

  _villeDepChangeText = (text) => {
    this.villeDep = text;
  }

  _villeArrivChangeText = (text) => {
    this.villeDep = text;
  }

  _nbpassagerChangeText = (text) => {
    this.nbpassager = text;
  }

  _toMapSelect = () => {
    // this.props.navigation.navigate('MapPosition')
    console.log(this.villeDep)
    console.log(this.villeArriv)
    console.log(this.state)
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
        <View style={{ flex: 1 }}>
        </View>
        <View style={{ flex: 8 }}>
          <KeyboardAvoidingView behavior={"padding"}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 10 }}>
                <Reinput
                  label="Coordonnées de départ"
                  fontSize={14}
                  editable={false}
                  labelActiveColor={CodeCouleur.activeCouleur}
                  underlineActiveColor={CodeCouleur.activeCouleur}
                  defaultValue={this.state.coordDep}
                />
              </View>
              <View style={{ flex: 2, paddingLeft: 15, paddingTop: 5 }}>
                <TouchableOpacity
                  onPress={this._toMapSelect}
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
                  defaultValue={this.state.coordArriv}
                />
              </View>
              <View style={{ flex: 2, paddingLeft: 15, paddingTop: 5 }}>
                <TouchableOpacity
                  onPress={this._toMapSelect}
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

            <Button
              onPress={this._toMapSelect}
              style={styles.text}
              title='Proposer'
              type="outline"
              buttonStyle={{
                backgroundColor: 'transparent'
              }}
            />

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