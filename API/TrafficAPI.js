const API_TOKEN = "XKqiWWXx9K0gDxrUfFqvUGIbONyqC6RW";
import APIkey from './ApiKey'
import ApiKey from './ApiKey';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const base_url = "http://192.168.8.101:3000/";
const token = SecureStore.getItemAsync('secure_token');

var configToken = {
    headers: { 'Authorization': "bearer " + token }
};

export function getDirection(origin, destination) { //the best direction selon google
    const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&units=metric&key=' + ApiKey.Api
    console.log(url)
    return axios.get(url)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            console.log(error.response.status)
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

export function getDirections(origin, destination) {
    const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&units=metric&alternatives=true&key=' + ApiKey.Api
    return fetch(url, configToken)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

// tracking
export function getTracks(id) {
    let idurl = '/';
    if (id == null) idurl += id;
    const url = base_url + 'users' + idurl + '/tracks'
    return axios.get(url, configToken)
        .then((response) => response.data)
        .catch((error) => console.error(error))
}

export function ajouterTracks(id, data) {
    let idurl = '/';
    if (id == null) idurl += id;
    const url = base_url + 'users' + idurl + '/tracks'
    return axios.post(url, data, configToken)
        .then((response) => response.data)
        .catch((error) => console.error(error))
}

//users
export function authentification(email, mp) {
    let user = {
        email: email,
        password: mp
    }
    const url = base_url + 'auth'
    console.log(url, user)

    return axios.post(url, user)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            console.log(error.response.status)
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

export function inscription(fistname, lastname, email, mp) {
    let user = {
        firstName: fistname,
        lastName: lastname,
        email: email,
        password: mp
    }
    const url = base_url + 'users'
    return axios.post(url, user)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            console.log(error.response.status)
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

export function getUsers(id) {
    let idurl = '/';
    if (id == null) idurl += id;
    const url = base_url + 'users' + idurl
    return axios.get(url, configToken)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


//covoiturage
export function proposerCovoiturage(data) {
    const url = base_url + 'covoiturages';
    return axios.post(url, data, configToken)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            console.log(error.response.status)
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

export function getCovoiturages(id) { // ra tsy misy id dia listeno miverina
    let idurl = '/';
    if (id == null) idurl += id;
    const url = base_url + 'covoiturages' + idurl
    return axios.get(url, configToken)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            console.log(error.response.status)
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}