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

class ListeCovoiturage extends React.Component {
  constructor(props) {
    super(props)
    this.departText = "";
    this.arriveeText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      covoiturages: [
        {
          id: 'kkk',
          depart: 'Mahamasina',
          arrivee: 'Itaosy',
          totalPassager: 6,
          nbpassager: 5,
          date: '2019-08-05',
          time: '08:00'
        },
        {
          id: 'aa',
          depart: 'Tana',
          arrivee: 'Majunga',
          nbpassager: 5,
          date: '2019-08-05',
          time: '08:00',
          totalPassager: 3,
          nbpassager: 1,
        }
      ],
      isLoading: false
    }
  }

  _loadCovoiturages = () => { // izay fonction misy anio fleche io dia vo bind automatic ary afaka ampiasana any @ components hafa
    console.log('text', this.departText);
    if (this.departText.length > 0) {
      this.setState({ isLoading: true })
      // getFilmsFromApiWithdepartText(this.departText, this.page + 1).then(data => {
      //   this.page = data.page;
      //   this.totalPages = data.total_pages;
      //   this.setState({
      //     covoiturages: [...this.state.films, ...data.results],
      //     isLoading: false
      //   })
      // });
    }
    this.setState({ isLoading: true })
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

  _searchCovoiturages= () => {
    this.page = 0;
    this.totalPages = 0;
    // this.setState({
    //   covoiturages: []
    // }, () => {
    //   console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de covoiturages : " + this.state.covoiturages.length)
      this._loadCovoiturages()
    // })
  }

  render() {
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
                      //onSubmitEditing={() => this._searchCovoiturages()}
                    />
                  </View>
                  {/* <View style={{ flex: 2, paddingLeft: 15, paddingTop: 18 }}>
                    <TouchableOpacity
                      onPress={() => this._searchCovoiturages()}
                    >
                      <Feather
                        name={'search'}
                        size={26}
                        color={CodeCouleur.activeCouleur}
                      />
                    </TouchableOpacity>
                  </View> */}
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
                      //onSubmitEditing={() => this._searchCovoiturages()}
                    />
                  </View>
                  {/* <View style={{ flex: 2, paddingLeft: 15, paddingTop: 18 }}>
                    <TouchableOpacity
                      onPress={() => this._searchCovoiturages()}
                    >
                      <Feather
                        name={'search'}
                        size={26}
                        color={CodeCouleur.activeCouleur}
                      />
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>


          <View style={{ flex: 1, flexDirection: 'column', marginTop:15 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 10 }}>
                <Button
                  onPress={()=>{this._searchCovoiturages()}}
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
    flex: 2,
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