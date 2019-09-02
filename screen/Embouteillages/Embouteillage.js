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

class Embouteillage extends React.Component {
  constructor(props) {
    super(props)
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      coordDep: {},
      nameLocDep: '',
      coordArriv: {},
      nameLocArriv: '',
      embouteillages: [{
        distance:15,
        pourcentage:10,
        routes: "`ilrBi{w`H}Ak@a@jAWt@eA_@s@tBADfBb@bBv@x@d@~At@rAp@|Bp@hFtArHpBtBh@p@Tr@I\\GZOLK`@m@t@mApAmFf@mCF_@RcA@o@e@iBc@aBOo@m@eBYw@w@wC]gAoBqFs@uBgAwCaBaFw@}Bu@qBI_@Ga@Ik@CqAKiEQuCQmBA{@JiER}BhA_FLy@Ds@@u@CS]eAs@uAc@qAGk@Am@Am@Eu@Mc@MUu@k@yBoAoHqFa@a@IOI[CSCe@VyGBSBi@@?BC@EAICEZwKn@aPReH@s@X{JNuCFeBhEPhHZ|HXjCHj@NbAVNALMPUH]AO?KBeAb@cNJcDH_ADs@@C@ECKGGE?A?[]sCsD{EoGuDeF}DiFwAsBlAgAfAu@F?HC@A@E?MEGCAFe@Ve@RIJIz@gC`@{AHq@Ag@Ia@}@eB[w@DIJUXaAvB}FJKJU@?@A@A@A@GGKAAY[qAeA?u@KqBMeCEUbAOXAd@DnBp@TBl@A`AGp@ILHj@EXGv@[X[pAeCZAVFp@\\pApE"
      }]
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

  _loadEmbouteillages = () => { // izay fonction misy anio fleche io dia vo bind automatic ary afaka ampiasana any @ components hafa
    // console.log('text', this.departText);
    // if (this.departText.length > 0) {
    // this.setState({ isLoading: true })
    // getCovoiturages('',this.page+1).then(data => {
    //   this.page = data.data.page;
    //   this.totalPages = data.data.total_pages;
    //   console.log("results",data.data.results)
    //   console.log("page",this.page)
    //   console.log("results",this.totalPages)
    //   this.setState({
    //     covoiturages: [...this.state.covoiturages, ...data.data.results],
    //     isLoading: false
    //   })
    // });
    // }
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
                    source={require('../../images/ic_position.png')}
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
                    source={require('../../images/ic_position.png')}
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
              onPress={this._proposer}
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