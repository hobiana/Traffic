// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import  FadeIn  from '../Animations/FadeIn'

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../images/favorite.png')}
        />
      )
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props

    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}
        >
          <View style={styles.content_container}>
            <View style={styles.image_container}>
              <Image style={{ flex: 1 }} source={
                {
                  uri: getImageFromApi(film.poster_path)
                }
              } />
            </View>
            <View style={styles.details_container}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.header_container}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.title}>
                      {this._displayFavoriteImage()}
                      <Text style={styles.title_text}>{film.original_title}</Text>
                    </View>
                    <View style={styles.note}>
                      <Text style={styles.note_text}>{film.vote_average}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.description_container}>
                  <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                </View>
                <View style={styles.date_container}>
                  <Text style={styles.date_text}>{film.release_date}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
    marginBottom: 20
  },
  content_container: {
    flex: 1,
    flexDirection: 'row'
  },
  image_container: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  details_container: {
    flex: 2,
    //backgroundColor: 'yellow',
    margin: 5
  },
  header_container: {
    flex: 3,
    //backgroundColor: 'red'
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
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  note_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  favorite_image: {
    width: 15,
    height: 15,
  }
})

export default FilmItem