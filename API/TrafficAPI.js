const API_TOKEN = "XKqiWWXx9K0gDxrUfFqvUGIbONyqC6RW";
import APIkey from './ApiKey'
import ApiKey from './ApiKey';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { AsyncStorage } from 'react-native';

const base_url = "http://192.168.1.8:3000/";
// const base_url = "https://apirafffic.herokuapp.com/";

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
        })
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

//coordonnées envoi constant
export function sendCoords(data) {
    const url = base_url + 'locations'
    return axios.post(url, data)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

// tracking
export async function getTracks(id) {
    console.log("anaty getTracks", id)
    const url = base_url + 'users/' + id + '/tracks'
    var token = await SecureStore.getItemAsync('secure_token');
    var configToken = {
        headers: { Authorization: "Bearer " + token }
    };
    return axios.get(url, configToken)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        })
        .catch((error) => {
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

export async function getPositionUserTracks(id) {
    console.log(" *******   anaty getPositionUserTracks ********", id)
    const url = base_url + 'users/' + id + '/tracks/coordinates?origin=traffic'
    var token = await SecureStore.getItemAsync('secure_token');
    var configToken = {
        headers: { Authorization: "Bearer " + token }
    };
    console.log(url)
    return axios.get(url, configToken)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        })
        .catch((error) => {
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

export async function ajouterTracks(iduser) {
    var user = await AsyncStorage.getItem('user_connected');
    user = JSON.parse(user)
    var token = await SecureStore.getItemAsync('secure_token');
    var configToken = {
        headers: { Authorization: "Bearer " + token }
    };
    const url = base_url + 'users/' + user.userId + '/tracks'
    const data = {
        id: iduser
    }
    return axios.patch(url, data, configToken)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
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
            console.log(error.response.data.message)
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}


//covoiturage
export async function proposerCovoiturage(coordDep, coordArriv, villeDep, villearriv, nbPassager, datetime) {
    let pointOrigin = coordDep.lat + "," + coordDep.lon;
    let pointDestination = coordArriv.lat + "," + coordArriv.lon;

    var user = await AsyncStorage.getItem('user_connected');
    user = JSON.parse(user)
    var token = await SecureStore.getItemAsync('secure_token');
    let direction = await getDirection(pointOrigin, pointDestination);
    let covoiturage = {
        "clientPurpose": user.userId,
        "departure": {
            "name": villeDep,
            "location": {
                "type": "Point",
                "coordinates": [coordDep.lat, coordDep.lon]
            }
        },
        "arrival": {
            "name": villearriv,
            "location": {
                "type": "Point",
                "coordinates": [coordArriv.lat, coordArriv.lon]
            }
        },
        "passengers": [],
        "totalPassengers": nbPassager,
        "dateTime": datetime,
        "routes": direction.data.routes[0].overview_polyline.points
    }
    console.log(url, covoiturage)
    const url = base_url + 'covoiturages';

    var configToken = {
        headers: { Authorization: "Bearer " + token }
    };
    console.log(configToken)

    return axios.post(url, covoiturage, configToken)
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
            console.log(error.response.data.message)
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

export async function getCovoiturages(id, page, origin, destination, datedebut, datefin, timedebut, timefin) { // ra tsy misy id dia listeno miverina
    let idurl = '';
    if (id != null && id != '') idurl += '/' + id;
    const url = base_url + 'covoiturages' + idurl + '?page=' + page + '&origin=' + origin + '&destination=' + destination + '&datedebut=' + datedebut + '&datefin=' + datefin + '&timedebut=' + timedebut + '&timefin=' + timefin
    console.log(url)
    console.log(page)

    var token = await SecureStore.getItemAsync('secure_token');
    var configToken = {
        headers: { Authorization: "Bearer " + token }
    };

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


export async function validerCovoiturage(idcovoiturage) {
    var user = await AsyncStorage.getItem('user_connected');
    user = JSON.parse(user)
    var token = await SecureStore.getItemAsync('secure_token');
    var configToken = {
        headers: { Authorization: "Bearer " + token }
    };
    const url = base_url + 'covoiturages/' + idcovoiturage + '/validate'
    const data = {
        "passengerId": user.userId
    }
    return axios.patch(url, data, configToken)
        .then((response) => {
            const rep = {
                status: response.status,
                data: response.data
            }
            return rep;
        }
        )
        .catch((error) => {
            const err = {
                status: error.response.status,
                data: error.response.data
            }
            return err;
        })
}

//embouteillage

export async function getTraffic(origin, destination) {
    const url = base_url + 'traffics?origin=' + origin + '&destination=' + destination
    console.log(url)
    var token = await SecureStore.getItemAsync('secure_token');
    var configToken = {
        headers: { Authorization: "Bearer " + token }
    };

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
