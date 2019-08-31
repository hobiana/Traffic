// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import FadeIn from '../../Animations/FadeIn'
import CodeCouleur from '../../helpers/CodeCouleur'
import FontAwesome from '@expo/vector-icons/FontAwesome'

class FilmItem extends React.Component {

    render() {
        const { covoiturage, displayDetailForCovoiturages } = this.props
        console.log(covoiturage._id)
        const firstLetters = covoiturage.departure.name.charAt(0) + covoiturage.arrival.name.charAt(0);
        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForCovoiturages(covoiturage)}>
                    <View style={styles.letters_container}>
                        <Text style={styles.letter_text}>{firstLetters.toUpperCase()}</Text>
                    </View>
                    <View style={styles.desc_container}>
                        <Text style={styles.desc_text} numberOfLines={3}>{covoiturage.departure.name} <FontAwesome name="chevron-right" /> {covoiturage.arrival.name} </Text>
                    </View>
                    <View style={styles.nbpassager_container}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nbpassager_text}>Places</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', }}>
                            <Text style={styles.nbpassager_text}>{covoiturage.passengers.length}/{covoiturage.totalPassengers}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
    },
    letters_container: {
        flex: 2,
        justifyContent: 'center',
        alignItems:'center'
    },
    letter_text: {
        paddingTop:10,
        width: 50,
        height: 50,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 30,
        backgroundColor: CodeCouleur.activeCouleur,
    },
    desc_container: {
        flex: 6,
        flexDirection: 'column',
        fontStyle: 'italic',
        justifyContent: 'center'
    },
    desc_text: {
        paddingLeft: 15
    },
    nbpassager_container: {
        flex: 2,
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: CodeCouleur.fondCouleur
    },
    nbpassager_text: {
        textAlign: 'center',
    }
})

export default FilmItem