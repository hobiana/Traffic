// Navigation/Navigation.js

import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image ! 
import { StyleSheet, Image } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import CodeCouleur from '../helpers/CodeCouleur'
import TabNavigatorOptions from '../helpers/tabNavigatorOptions'
import ListeCovoiturage from '../screen/Covoiturages/ListeCovoiturage'
import PropositionCovoiturage from '../screen/Covoiturages/PropositionCovoiturage'
import MapPosition from '../screen/Covoiturages/MapPosition'

const CovoiturageNavigation = createMaterialTopTabNavigator(
    {
        Liste: {
            screen: ListeCovoiturage,
            tiltle: 'Liste'
        },
        Proposition: {
            screen: PropositionCovoiturage,
            tiltle: 'Proposition'
        },
        Map :{
            screen: MapPosition
        }
    },
    TabNavigatorOptions
)
export default createAppContainer(CovoiturageNavigation)