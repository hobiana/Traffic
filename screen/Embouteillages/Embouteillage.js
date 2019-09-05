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
        "lat": -18.9188737,
        "lon": 47.5263146,
      },
      nameLocDep: '',
      coordArriv: {
        "lat": -18.9859782,
        "lon": 47.532721,
      },
      nameLocArriv: '',
      embouteillages: [
        {
          distance: 15,
          pourcentage: 10,
          routes: "nf{rBavbaHNi@RJt@h@h@RRDjBHfDPbI\\jCJt@C`@ITKpBoA`HaEnAg@lBy@\\Uj@k@Xk@ZgANy@VqBRq@Lc@Xc@n@s@FODAFELOFQ@SAUGQKOCEIEiCaBaAk@mA]}@MwLkAuB[{@Uy@]eBkAqA{AkAaBsEeG_@_@o@i@wAo@q@Q}D_@}Hs@eBSaC_@wDu@aKiCyCo@kASuAU_BMuBIsBC{CNaBJiABmAEkBIoAS_AYyAm@iC_Bq@g@qEoD}F{EyAcAaA_@gASw@Gq@?yAJiCb@gNfBeALcBLcG`@gGPkABoC?wDCyNYiGUoGOcAIgAMiClFgOlYeCdFYl@s@rBSr@O`AWvBEz@A~BJlCZ~BtAjKd@dDX~BPxB@~@EnAIrAMz@e@hBe@lAUd@[j@{@jAcEvEUZUd@Un@Q`AEjAFnBH~CC`AABAB[\\a@NqCn@eHxAiB`@sAb@UJGBKIIKEEy@oAc@g@YQc@Q{@Si@CaDZo@AiBQQEUOQYe@gAq@{ASWs@m@SWKSQk@e@wAY]{AsAUKQC{AAgBCq@No@Xo@Re@@_AW[K_Ai@u@k@UUQDeG~BmE|AeAV[@oCWcK_B}Di@iF}@aBYe@Bc@L[XSl@Ih@Ab@c@CwAYeCaAiAG{A_@q@Ok@CgAHuAf@oAx@]ZuAfAg@Xc@H]@i@YE]OUWUq@WiIWkBGgCW]?OBe@T_@^Mb@E^?d@VdAbAlDLb@"
        },
        {
          distance: 8.8,
          pourcentage: 20,
          routes: "nf{rBavbaHNi@UI]GgAOuACe@BuAR_D`@aANyATcBLy@@kAIkCi@mBOo@EcEMwBCiE?}BDeCX_D^u@PiAd@wDfBoF`Cu@`@{A~@oElC}DvBYHM?YGSMMO[q@Ui@Qm@AgAA}@Cc@GSYi@_@O]C[Fc@^{BbD[\\YNe@LwC`@{Fr@{IVgNEkNEk@@q@JmAVo@Dk@E_AOm@BcA^i@V]S}@_@}B_AOGg@bBM\\QDu@T_CpA{ExCyDdCmCdBe@TqEnAwG|Aa@@cBXK?YGK?OHCHc@`@iGvAwGrAoBl@[NQOa@q@c@m@m@m@UKq@Uw@Ou@BgBRs@BkAI_AMQIQOg@cA[u@k@kAg@a@_@a@MSm@oBSc@c@e@w@u@a@WQEMAsCCs@?WD_A^c@PYDc@CcAYq@[k@_@q@k@IIG@WHuJtDqBl@u@LU?m@GuAO}B_@_De@uCc@cFs@qEy@c@IW?_@Fa@TU`@Op@E`@?RSASAo@MiA]aBo@uAKmBg@g@Ei@?}@H]Nm@Tk@\\w@n@mA`Ak@^YLu@Di@YAOIYQQ]Um@QkL]gCWU?O@]He@^OZK^AXBn@dA~D^hA"
        },
        {
          distance: 15.1,
          pourcentage: 2,
          routes: "nf{rBavbaHNi@RJt@h@h@RRDjBHfDPbI\\jCJt@C`@ITKpBoA`HaEnAg@lBy@\\Uj@k@Xk@ZgANy@VqBRq@Lc@Xc@n@s@FODAFELOFQ@SAUGQKOCEIEiCaBaAk@mA]}@MwLkAuB[{@Uy@]eBkAqA{AkAaBsEeG_@_@o@i@wAo@q@Q}D_@}Hs@eBSaC_@wDu@aKiCyCo@kASuAU_BMuBIsBC{CNaBJiABmAEkBIoAS_AYyAm@iC_Bq@g@qEoD}F{EyAcAaA_@gASw@Gq@?yAJiCb@gNfBeALcBLcG`@gGPkABoC?wDCyNYiGUoGOcAIgAMiClFgOlYeCdFYl@s@rBSr@O`AWvBEz@A~BJlCZ~BtAjKd@dDX~B@LSBk@HcDx@}@Hw@Bq@E}@?g@MWEGMKSMOOMYKu@]q@c@e@]YMm@Mw@Qy@[c@QYIWIi@e@m@m@gAsA}@}@_@U[KqBY{@M[GMQYwAKsAGm@a@a@_@a@s@}@aBiBy@u@yAeBgBsBq@aAQa@AI@KGIOK_@QkAkA][GYOw@GOi@ImAW{@[]GwAGa@@sAJ[BqA@eDg@oCm@aB{@wA}@a@Uy@YwBe@uA_@y@Is@LOJcAfAq@^}@d@iC~@o@Nk@BkAEm@GQIIOE[Aa@Kg@[e@SQQI}@Sw@SMGuCl@sA\\k@JgBHYFWLUVMVEVAv@Cv@GPq@f@yBjA{Ar@YHc@Hq@JwDn@_ATwAf@_Bl@eBr@q@RqC`@i@J]LSN_@\\HTThAZh@r@j@Vf@tA|Cd@vA_A`BUNKD]BaA?YHq@`@{@\\cAVkA^Ft@DNDBN@l@Gx@It@@PEl@mAPKJ?JBHJ@HIpADNLHz@HHRETIPSDWBe@CcAj@oAr@OBk@@k@AQFULUZQl@S\\ER?ZOrAGJKHQBw@ESBMJQj@Uf@GHaATiBb@UPa@b@CP@JPNXPHBl@B^PHNBXCNEHeAn@c@b@QVSl@ITIJsAfAgAdAy@vA[bAKd@?LBPOd@l@L~@AXFbA|@XN`@P^Jz@`Cp@lBPCDDDBD?TAh@Kh@QVQFGz@aB^o@RAN@`@N^Rp@fC^hA"
        },
      ]
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