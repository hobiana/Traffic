// Navigation/Navigation.js

import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image ! 
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Code from '../helpers/CodeCouleur'
import Login from '../screen/Authentification/Login'
import Inscription from '../screen/Authentification/Inscription'
import Home from '../screen/Home/Home'
import Embouteillage from '../screen/Embouteillages/Embouteillage'
import Profil from '../screen/Profil/Profil'
import FicheCovoiturage from '../screen/Covoiturages/FicheCovoiturage'
import FicheTrack from '../screen/Track/FicheTrack'
import MapPosition from '../screen/Covoiturages/MapPosition'
import ItineraireCovoiturage from '../screen/Covoiturages/ItineraireCovoiturage'


//tab navigation
import CovoiturageNavigation from '../Navigation/CovoiturageNavigation'
import LocalisationNavigation from '../Navigation/LocalisationNavigation'


const navoptions =
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Code.fondCouleur
    },
    titleStyle: {
      alignSelf: 'center'
    }
  }
}

const HomeStackNavigator = createStackNavigator(
  {
    Home: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: Home,
      navigationOptions: {
        title: 'Accueil'
      }
    }
  },
  navoptions
)

const CovoiturageStackNavigator = createStackNavigator(
  {
    Covoiturage: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: CovoiturageNavigation,
      navigationOptions: {
        title: 'Covoiturage'
      }
    },
    FicheCovoiturage: {
      screen: FicheCovoiturage,
    },
    ItineraireCovoiturage: {
      screen: ItineraireCovoiturage,
    },
    MapPosition: {
      screen: MapPosition,
      navigationOptions: {
        title: 'Choisir une position'
      }
    }
  },
  navoptions
)

const EmbouteillageStackNavigator = createStackNavigator(
  {
    Embouteillage: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: Embouteillage,
      navigationOptions: {
        title: 'Traffic'
      }
    }
  },
  navoptions
)

const TrackStackNavigator = createStackNavigator(
  {
    Track: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: LocalisationNavigation,
      navigationOptions: {
        title: 'Localisation'
      }
    },
    FicheTrack: {
      screen: FicheTrack
    }
  },
  navoptions
)

const ProfilStackNavigator = createStackNavigator(
  {
    Track: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: Profil,
      navigationOptions: {
        title: 'Profil'
      }
    }
  },
  navoptions
)

// const FavoritesStackNavigator = createStackNavigator({
//   Favorites: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
//     screen: Favorites,
//     navigationOptions: {
//       title: 'Favoris'
//     }
//   },
//   FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
//     screen: FilmDetail
//   }
// })

const TrafficTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
          return <Image
            source={require('../images/ic_menu_home.png')}
            style={styles.icon} /> // On applique un style pour les redimensionner comme il faut
        }
      }
    },
    // TabPage: { screen: ({ navigation }) => <TabPage screenProps={{ rootNavigation: navigation }} />},
    Covoiturage: {
      screen: CovoiturageStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../images/ic_menu_carpooling.png')}
            style={styles.icon} />
        }
      }
    },
    Track: {
      screen: TrackStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../images/ic_menu_tracking.png')}
            style={styles.icon} />
        }
      }
    },
    Embouteillage: {
      screen: EmbouteillageStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../images/ic_menu_traffic.png')}
            style={styles.icon} />
        }
      }
    },
    Profil: {
      screen: ProfilStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../images/ic_menu_profil.png')}
            style={styles.icon} />
        }
      }
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Code.activeCouleur, // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: Code.fondCouleur, // Couleur d'arrière-plan des onglets non sélectionnés #ae3ca5
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})


const AppSwitchNavigator = createSwitchNavigator(
  {
    Login: Login,
    Inscription: Inscription,
    Main: TrafficTabNavigator
  }
)

export default createAppContainer(AppSwitchNavigator)