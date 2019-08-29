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
    Text,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import bgimage from '../../images/bgimage.png'
import traffic from '../../images/app_logo.png'
import { TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {
    inscription,
    authentification
} from '../../API/TrafficAPI'

const { width: WIDTH } = Dimensions.get('window')
class Inscription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false
        }
        this.nom = "";
        this.prenom = "";
        this.email = "";
        this.motdepasse = "";
        this.confirmmotdepasse = "";
    }

    _nomChangeText = (text) => {
        this.nom = text;
    }

    _prenomChangeText = (text) => {
        this.prenom = text;
    }

    _emailChangeText = (text) => {
        this.email = text;
    }

    _motdepasseChangeText = (text) => {
        this.motdepasse = text;
    }
    _confirmmotdepasseChangeText = (text) => {
        this.confirmmotdepasse = text;
    }

    _toLogin = () => {
        this.props.navigation.navigate('Login')
    }
    _signup = async () => {
        if (this.nom != "" && this.prenom != "" && this.motdepasse != "" && this.email != "" && this.confirmmotdepasse != "") {
            if (this.confirmmotdepasse != this.motdepasse) {
                Alert.alert(
                    'Erreur',
                    'Mot de passe non identique',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            } else {
                const iduser = await inscription(this.nom, this.prenom,this.email,this.motdepasse);
                if(iduser.status == 201){
                    const tokenReturn = await authentification(this.email, this.motdepasse);
                    await SecureStore.setItemAsync('secure_token', tokenReturn.data.accessToken);
                    await SecureStore.setItemAsync('id_user', iduser.data.id);
                    this.props.navigation.navigate('Main')
                }else{
                    Alert.alert(
                        'Erreur',
                        'Erreur d\'inscription',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                }
            }
        } else {
            Alert.alert(
                'Erreur',
                'Remplissez tous les champs',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
    }

    showPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
        console.log(this.state.showPassword);
    }

    render() {
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
                            placeholder={'Nom'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={(text) => this._nomChangeText(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Feather
                            name={'user'}
                            size={26}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder={'Prénom'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={(text) => this._prenomChangeText(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Feather
                            name={'user'}
                            size={26}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder={'Email'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={(text) => this._emailChangeText(text)}
                        />
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
                            style={styles.input}
                            onChangeText={(text) => this._motdepasseChangeText(text)}
                        />

                        <TouchableOpacity style={styles.btnEye}
                            onPress={this.showPassword}>
                            <Feather
                                name={this.state.showPassword == false ? 'eye' : 'eye-off'}
                                size={24}
                                color={'rgba(255,255,255,0.7)'}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Feather
                            name={'lock'}
                            size={24}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder={'Confirmer mot de passe'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            secureTextEntry={!this.state.showPassword}
                            style={styles.input} 
                            onChangeText={(text) => this._confirmmotdepasseChangeText(text)}
                            />
                    </View>

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this._signup}>
                        <Text style={styles.text}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnInscription}
                        onPress={this._toLogin}>
                        <Text style={{ textAlign: 'center' }}>Se connecter</Text>
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
        flex: 2,
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
        color: '#fff',
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

export default connect(mapStateToProps)(Inscription)