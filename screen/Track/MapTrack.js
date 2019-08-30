// Components/Test.js

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native'
import MapView from 'react-native-maps';
import { getDirection } from '../../API/TrafficAPI'
import polyline  from '@mapbox/polyline'


class MapTrack extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {},
      routes:[]
    }
  }

  componentDidMount(){
    // getDirection
    // getDirection(this.searchedText, this.page + 1).then(data => {
    //   this.page = data.page;
    //   this.totalPages = data.total_pages;
    //   this.setState({
    //     films: [...this.state.films, ...data.results],
    //     isLoading: false
    //   })
    // });
    let coords =polyline.decode('r|mrBclaaH`ApDLh@AAEAGAM?KBKJEHAJWTwA|AMRENGDGPHPFDH?Xf@D`@DnBF\\J\\l@dBj@vAAF?LFPLJJBTALGHMBK?En@y@PGLAl@LtAV`DLdAJbAX\\LjBjAd@LpDRtAJrDdA~FbB|@R|ARhEl@l@NjAl@TFXD`@ClDi@nHoA~A]d@SLMdB}Bh@g@\\Sb@MbCYfAMj@OlHaDtBs@nAOp@Ax@DjBZp@PVJ^TH?DFDBF@NAJER?vAMpJwApHmA`AQn@Sb@U`@]b@a@~@oA^_@PSd@SzAg@dBc@~Dy@vFqAnAWD?HADGBUCIMQKUGWEyBCs@GmA?a@Bq@L{@Rq@Rc@R_@l@u@tDiEv@iAv@cB\\cAPy@Jk@NyAF_CC_AMuAQcBe@aDqA{Jc@eDKoAGaC@g@BkALwAT}AP_AhA_D~DcIfPi[|@iBr@Hf@F`@BrFNvGTrR^fG?|CIvCK`CO~DYjAMdM_BnDi@r@Kt@GnA@z@Hf@JbA^ZPbAr@tLtJ\\XlCfBhAp@l@Tb@LnAXjALxBHbA@`COnBMjB?nBBnBLxAPzDr@fLtCzDx@bCb@dCXdE`@`Hl@bARf@PpAr@j@h@h@p@~CfEfCdDj@p@p@h@r@`@x@\\zA\\f@H~JbAhCZxAl@XRRRb@t@Lb@R`A@PCJ?jBEv@Gz@WpBOx@GXSl@Yj@k@j@]TmBx@oAf@aH`E}@j@iAn@a@H_@BsAEoCK_I]oDQu@ISGg@Ww@e@m@S')
    let routes = coords.map((point, indice) => {
      console.log(indice, point)
      return {
        latitude : point[0],
        longitude: point[1]
      }
    })
    
    this.setState({
      routes: routes
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -18.91802,
            longitude: 47.52594,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.routes.length>0?
          <MapView.Polyline
            coordinates={this.state.routes}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={6}
          />
            : null
        }
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

export default MapTrack