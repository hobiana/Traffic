// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from 'react-native'
import Reinput from 'reinput'
import CodeCouleur from '../../helpers/CodeCouleur'
import { Feather } from '@expo/vector-icons';
import CovList from '../../components/Covoiturage/CovList'
import {
  getCovoiturages
} from '../../API/TrafficAPI'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'

class ListeCovoiturage extends React.Component {
  constructor(props) {
    super(props)
    this.departText = "";
    this.arriveeText = "";
    this.page = 0;
    this.totalPages = 0;

    let date = moment(new Date()).format('YYYY-MM-DD');
    let time = moment(new Date()).format('HH:mm');

    this.state = {
      covoiturages: [],
      isLoading: false,
      date: date,
      time: time
    }
  }

  _loadCovoiturages = () => { // izay fonction misy anio fleche io dia vo bind automatic ary afaka ampiasana any @ components hafa
    console.log('text', this.departText);
    // if (this.departText.length > 0) {
    this.setState({ isLoading: true })
    getCovoiturages('',this.page+1).then(data => {
      this.page = data.data.page;
      this.totalPages = data.data.total_pages;
      console.log("results",data.data.results)
      console.log("page",this.page)
      console.log("results",this.totalPages)
      this.setState({
        covoiturages: [...this.state.covoiturages, ...data.data.results],
        isLoading: false
      })
    });
    // }
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

  _searchDepartInputChanged(text) {
    this.departText = text;
  }

  _searchArriveeInputChanged(text) {
    this.arriveeText = text;
  }

  _searchCovoiturages() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      covoiturages: []
    }, () => {
      this._loadCovoiturages()
    })
  }

  render() {
    console.log("render")
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 10 }}>
                    <Reinput
                      label="Départ"
                      fontSize={14}
                      labelActiveColor={CodeCouleur.activeCouleur}
                      underlineActiveColor={CodeCouleur.activeCouleur}
                      onChangeText={(text) => this._searchDepartInputChanged(text)}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>


          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 10 }}>
                    <Reinput
                      label="Arrivée"
                      fontSize={14}
                      labelActiveColor={CodeCouleur.activeCouleur}
                      underlineActiveColor={CodeCouleur.activeCouleur}
                      onChangeText={(text) => this._searchArriveeInputChanged(text)}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <DatePicker
                    style={{ width: 150 }}
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
                    style={{ width: 150 }}
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
              <View style={{ flex: 1 }}></View>
            </View>
          </View>


          <View style={{ flex: 1, flexDirection: 'column', marginTop: 15 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 10 }}>
                <Button
                  onPress={() => { this._searchCovoiturages() }}
                  style={styles.text}
                  title='Rechercher'
                  type="outline"
                  buttonStyle={{
                    backgroundColor: 'transparent'
                  }}
                />
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>
        </View>


        <View style={styles.covoiturage_container}>
          <CovList
            covoiturages={this.state.covoiturages}
            navigation={this.props.navigation}
            loadCovoiturages={this._loadCovoiturages}
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
  search_container: {
    flex: 4,
  },
  covoiturage_container: {
    flex: 8,
    marginTop: 10
  },
  loading_container: {
    flex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ListeCovoiturage