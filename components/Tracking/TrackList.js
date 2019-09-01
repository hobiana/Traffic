// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import TrackItem from './TrackItem'
import { connect } from 'react-redux'

class TrackList extends React.Component {

    constructor(props) {
        super(props)
    }

    _displayDetailForTrack = (id) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FicheTrack')
    }

    render() {
        console.log(this.props.tracks)
        return (
            <FlatList
                style={styles.list}
                data={this.props.tracks}
                keyExtractor={(item, index) => item.id.toString()+index}
                renderItem={({ item}) => (
                    <TrackItem
                        track={item}
                        displayDetailForTrack={this._displayDetailForTrack}
                    />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
                        // On appelle la méthode loadFilm du component Search pour charger plus de films
                        this.props.loadListPerson()
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

export default connect(mapStateToProps)(TrackList)