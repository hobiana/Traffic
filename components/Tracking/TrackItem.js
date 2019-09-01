// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import FadeIn from '../../Animations/FadeIn'
import CodeCouleur from '../../helpers/CodeCouleur'

class TrackItem extends React.Component {
    render() {
        const { track, displayDetailForTrack } = this.props
        const firstLetters = track.lastName.charAt(0) + track.firstName.charAt(0);
        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForTrack(track.id)} >
                    <View style={styles.letters_container}>
                        <Text style={styles.letter_text}>{firstLetters.toUpperCase()}</Text>
                    </View>
                    <View style={styles.desc_container}>
                        <Text style={styles.desc_text}>{track.lastName} {track.firstName}</Text>
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
})

export default TrackItem