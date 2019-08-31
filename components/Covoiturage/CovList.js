// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CovItem from './CovItem'
import { connect } from 'react-redux'

class CovList extends React.Component {

    constructor(props) {
        super(props)
    }

    _displayDetailForCovoiturage = (item) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FicheCovoiturage', { covoiturage: item })
    }

    render() {
        console.log(this.props.covoiturages.length)
        return (
            <FlatList
                style={styles.list}
                data={this.props.covoiturages}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <CovItem
                        covoiturage={item}
                        displayDetailForCovoiturages={this._displayDetailForCovoiturage}
                    />
                )}
                onEndReachedThreshold={0.75}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPages) {
                        // On appelle la méthode loadFilm du component Search pour charger plus de films
                        this.props.loadCovoiturages()
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