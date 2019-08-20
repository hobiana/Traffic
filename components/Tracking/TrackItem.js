// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import FadeIn from '../../Animations/FadeIn'
import CodeCouleur from '../../helpers/CodeCouleur'

class TrackItem extends React.Component {
    render() {
        const { track, displayDetailForTrack } = this.props

        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForTrack(track.id)}
                >
                    <View style={styles.desc_container}>
                        <Text>Dép : Antananarivo / Arr : Majunga </Text>
                    </View>
                    <View style={styles.nbpassager_container}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nbpassager_text}>Places</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', }}>
                            <Text style={styles.nbpassager_text}>3 / 6</Text>
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
    desc_container: {
        flex: 4,
        flexDirection: 'column',
        fontStyle: 'italic',
        color: '#666666'
    },
    nbpassager_container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: CodeCouleur.fondCouleur
    },
    nbpassager_text: {
        textAlign: 'center',
    }
})

export default TrackItem