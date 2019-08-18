// Components/Favorites.js

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
    KeyboardAvoidingView,
    Image,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import bgimage from '../../images/bgimage.png'
import traffic from '../../images/app_logo.png'
import { TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window')
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false
        }
    }

    //https://www.youtube.com/watch?v=QtuZJPwZXvo

    _toInscription = () => {
        this.props.navigation.navigate('Inscription')
        console.log(this.props.navigation)
    }

    _toLogin = () => {
        this.props.navigation.navigate('Main')
        console.log(this.props.navigation)
    }

    showPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
        console.log(this.state.showPassword);
    }

    render() {
        console.log(this.props)
        return (
            <ImageBackground
                source={bgimage}
                style={styles.bg_container}>
                <View style={styles.images_container}>
                    <View style={{ flex: 1 }}>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Image source={traffic} />
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                </View>
                <KeyboardAvoidingView behavior="position" style={styles.form_container}>
                    <View style={styles.inputContainer}>
                        <Feather
                            name={'user'}
                            size={26}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder={'Pseudo'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            style={styles.input} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Feather
                            name={'lock'}
                            size={24}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder={'Mot de passe'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            secureTextEntry={!this.state.showPassword}
                            style={styles.input} />
                        <TouchableOpacity style={styles.btnEye}
                            onPress={this.showPassword}>
                            <Feather
                                name={this.state.showPassword == false ? 'eye' : 'eye-off'}
                                size={24}
                                color={'rgba(255,255,255,0.7)'}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this._toLogin}>
                        <Text style={styles.text}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnInscription}
                        onPress={this._toInscription}>
                        <Text style={{ textAlign: 'center' }}>S'inscrire</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    bg_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null
    },
    images_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    inputContainer: {
        marginBottom: 5
    },
    input: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 25,
        paddingLeft: 45,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 11,
        right: 37
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 25,
        marginTop: 20
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    btnInscription: {
        marginTop: 5
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Login)