// Navigation/Navigation.js

import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import TabNavigatorOptions from '../helpers/tabNavigatorOptions'
import MapTrack from '../screen/Track/MapTrack'
import LocaliserTrack from '../screen/Track/LocaliserTrack'

const LocalisationNavigation = createMaterialTopTabNavigator(
    {
        Map: {
            screen: MapTrack,
            tiltle: 'Map'
        },
        Localiser: {
            screen: LocaliserTrack,
            tiltle: 'Localiser'
        },
    },
    TabNavigatorOptions
)
export default createAppContainer(LocalisationNavigation)