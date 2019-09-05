
// Components/Test.js

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import HomeCovoiturage from '../../components/Home/HomeCovoiturage'
import HomeLocalisation from '../../components/Home/HomeLocalisation'
import HomeTraffic from '../../components/Home/HomeTraffic'

class Home extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <ScrollView>
                    <View style={styles.logo_container}>
                        <Image
                            source={require('../../assets/ic_logo.png')}
                        />
                    </View>
                    <View style={styles.desc_container}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Covoiturage') }}>
                            <HomeCovoiturage />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Track') }}>
                            <HomeLocalisation />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Embouteillage') }}>
                            <HomeTraffic />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#593d7b'
    },
    logo_container: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    desc_container: {
        flex: 2,
        backgroundColor: '#593d7b'
    }
})

export default Home