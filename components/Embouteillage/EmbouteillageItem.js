// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import FadeIn from '../../Animations/FadeIn'
import CodeCouleur from '../../helpers/CodeCouleur'

class EmbouteillageItem extends React.Component {
    render() {
        const { embouteillage, displayDetailForEmbouteillage, index } = this.props;
        console.log("emboutaka", this.props)
        const p = "P";
        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForEmbouteillage(embouteillage)} >
                    <View style={styles.letters_container}>
                        <Text style={styles.letter_text}>{p.toUpperCase()}</Text>
                    </View>
                    <View style={styles.desc_container}>
                        <Text style={styles.desc_text}>Piste {index + 1}</Text>
                    </View>
                    <View style={styles.nbpassager_container}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nbpassager_text}>Distance</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', }}>
                            <Text style={styles.nbpassager_text}>15 km</Text>
                        </View>
                    </View>
                    <View style={styles.nbpassager_container}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nbpassager_text}>Traffic</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', }}>
                            <Text style={styles.nbpassager_text}>5%</Text>
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
        alignItems: 'center'
    },
    letter_text: {
        paddingTop: 10,
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
    nbpassager_container: {
        flex: 2,
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: CodeCouleur.fondCouleur
    },
    desc_text: {
        paddingLeft: 15
    },
    nbpassager_text: {
        textAlign: 'center',
    }
})

export default EmbouteillageItem