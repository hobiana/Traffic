// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CovItem from './CovItem'
import { connect } from 'react-redux'

class CovList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForCovoiturage = (id) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FicheCovoiturage')
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.covoiturages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CovItem
                        covoiturage={item}
                        displayDetailForCovoiturages={this._displayDetailForCovoiturage}
                    />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
                        // On appelle la méthode loadFilm du component Search pour charger plus de films
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(CovList)