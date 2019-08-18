// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import FadeIn from '../../Animations/FadeIn'
import CodeCouleur from '../../helpers/CodeCouleur'

class HomeTraffic extends React.Component {
    render() {

        return (
            <FadeIn>
                <View style={styles.main_container}>
                    <View style={styles.image_container}>
                        <Image source={require('../../images/traffic.png')} />
                    </View>
                    <View style={styles.details_container}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={styles.header_container}>
                                <Text style={styles.title_text}>Traffic</Text>
                            </View>
                            <View style={styles.description_container}>
                                <Text style={styles.description_text} numberOfLines={6}>
                                   Eviter les heures de bouchons. Selectionner votre arrivée et voyer la liste des trajets possibles avec le taux de bouchons.
                                   Le choix du trajt vous appartient!!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 175,
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    image_container: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'center',
        // backgroundColor:'yellow'
    },
    details_container: {
        flex: 2,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'blue'
    },
    header_container: {
        flex: 2,
    },
    title: {
        flex: 3,
        //backgroundColor: 'red'
    },
    note: {
        flex: 1,
        //backgroundColor: 'brown'
    },
    description_container: {
        flex: 7,
        //backgroundColor: 'green'
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    description_text: {
        fontStyle: 'italic',
        color: '#fff',
        textAlign: 'center'
    },
    title_text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        textAlign: 'center',
        color: CodeCouleur.activeCouleurText,
        fontStyle: 'italic'
    }
})

export default HomeTraffic