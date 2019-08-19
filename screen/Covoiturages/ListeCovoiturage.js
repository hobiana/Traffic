// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Reinput from 'reinput'
import CodeCouleur from '../../helpers/CodeCouleur'
import { Feather } from '@expo/vector-icons';
import CovList from '../../components/Covoiturage/CovList'

class ListeCovoiturage extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      covoiturages: [
        {
          id:'kkk',
          depart: 'aa'
        },
        {
          id:'ssese',
          depart: 'bb'
        }
      ],
      isLoading: false
    }
  }

  _loadCovoiturages = () => { // izay fonction misy anio fleche io dia vo bind automatic ary afaka ampiasana any @ components hafa
    console.log('text', this.searchedText);
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      // getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
      //   this.page = data.page;
      //   this.totalPages = data.total_pages;
      //   this.setState({
      //     covoiturages: [...this.state.films, ...data.results],
      //     isLoading: false
      //   })
      // });
    }
    this.setState({
      isLoading: true
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

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _searchCovoiturages() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      covoiturages: []
    }, () => {
      console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.covoiturages.length)
      this._loadCovoiturages()
    })
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm);
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 10 }}>
                  <Reinput
                    label="Départ"
                    fontSize={14}
                    labelActiveColor={CodeCouleur.activeCouleur}
                    underlineActiveColor={CodeCouleur.activeCouleur}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchCovoiturages()}
                  />
                </View>
                <View style={{ flex: 2, paddingLeft: 15, paddingTop: 18 }}>
                  <TouchableOpacity
                    onPress={() => this._searchCovoiturages()}
                  >
                    <Feather
                      name={'search'}
                      size={26}
                      color={CodeCouleur.activeCouleur}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
        <View style={styles.covoiturage_container}>
          <CovList
            covoiturages={this.state.covoiturages} 
            navigation={this.props.navigation} 
            loadFilms={this._loadCovoiturages} 
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
    flex: 1,
  },
  covoiturage_container: {
    flex: 8
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ListeCovoiturage