// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import FadeIn from '../../Animations/FadeIn'
import CodeCouleur from '../../helpers/CodeCouleur'
import FontAwesome from '@expo/vector-icons/FontAwesome'

class FilmItem extends React.Component {
    con


    render() {
        const { covoiturage, displayDetailForCovoiturages } = this.props
        const firstLetters = covoiturage.depart.charAt(0) + covoiturage.arrivee.charAt(0);
        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForCovoiturages(covoiturage.id)}>
                    <View style={styles.letters_container}>
                        <Text style={styles.letter_text}>{firstLetters.toUpperCase()}</Text>
                    </View>
                    <View style={styles.desc_container}>
                        <Text style={styles.desc_text} numberOfLines={3}>{covoiturage.depart} <FontAwesome name="chevron-right" /> {covoiturage.arrivee} </Text>
                    </View>
                    <View style={styles.nbpassager_container}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nbpassager_text}>Places</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', }}>
                            <Text style={styles.nbpassager_text}>{covoiturage.nbpassager}/{covoiturage.totalPassager}</Text>
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