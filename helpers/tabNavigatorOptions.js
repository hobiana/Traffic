import CodeCouleur from './CodeCouleur'

export default tabNavigatorOptions = {
    tabBarOptions: {
        tinColor: '#fff',
        activeTintColor: CodeCouleur.fondCouleur,
        inactiveTintColor: 'gray',
        upperCaseLabel: false,
        indicatorStyle: {
            height: 2,
            bottom: 0,
            backgroundColor: CodeCouleur.fondCouleur,
            borderRadius:10
        },
        style: {
            backgroundColor: '#fff',
            indicatorStyle: 'red'
        }
    }
}