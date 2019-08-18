// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import FadeInRight from '../../Animations/FadeInRight'
import  CodeCouleur  from '../../helpers/CodeCouleur'

class HomeLocalisation extends React.Component {
    render() {

        return (
            <FadeInRight>
                <View style={styles.main_container}>
                    <View style={styles.details_container}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={styles.header_container}>
                                <Text style={styles.title_text}>Localisation</Text>
                            </View>
                            <View style={styles.description_container}>
                                <Text style={styles.description_text} numberOfLines={6}>
                                    Il vous est possible de localiser un ou plusieurs personnes!!
                                    A condition qu'elles ne le souhaitent également.
                                </Text>
                                <Text style={{textAlign:'center'}}  numberOfLines={6}>
                                    😊
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.image_container}>
                        <Image source={require('../../images/home_localisation.png')} />
                    </View>
                </View>
            </FadeInRight>
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
        justifyContent: 'center',
        // backgroundColor:'yellow'
    },
    details_container: {
        flex: 2,
        paddingLeft: 5,
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

export default HomeLocalisation