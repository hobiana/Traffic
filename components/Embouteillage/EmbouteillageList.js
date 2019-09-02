// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import EmbouteillageItem from './EmbouteillageItem'
import { connect } from 'react-redux'

class EmbouteillageList extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.embouteillages)
    }

    _displayDetailForEmbouteillage = (embouteillage) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('ItineraireEmbouteillage', { embouteillage: embouteillage })
    }

    render() {
        console.log("liste emboutak",this.props)
        return (
            <FlatList
                style={styles.list}
                data={this.props.embouteillages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index}) => (
                    <EmbouteillageItem
                        embouteillage={item}
                        index={index}
                        displayDetailForEmbouteillage={this._displayDetailForEmbouteillage}
                    />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPages) {
                        // On appelle la méthode loadFilm du component Search pour charger plus de films
                        this.props.loadEmbouteillages()
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

export default connect(mapStateToProps)(EmbouteillageList)