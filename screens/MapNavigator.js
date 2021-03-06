import React, { Component } from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo'; 

export default class App extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    test:100,
  };

  componentDidMount() {
    this._getLocationAsync();
    console.log('again called');
  }

  _handleMapRegionChange = mapRegion => {
    // console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.paragraph}>
          Pan, zoom, and tap on the map!
        </Text> */}
        
        {
          // this.state.locationResult === null ?
          // <Text>Finding your current location...</Text> :
          // this.state.hasLocationPermissions === false ?
          //   <Text>Location permissions are not granted.</Text> :
          //   this.state.mapRegion === null ?
          //   <Text>Map region doesn't exist.</Text> :
            // <MapView
            //   style={{ alignSelf: 'stretch', flex:1 }}
            //   region={this.state.mapRegion}
            //   onRegionChange={this._handleMapRegionChange}
            // />
            
        }
        <Button
          onPress={()=>this.props.screenProps.onClick()}
          title="{this.props.newVar}"
        />
        <Text>
        {this.props.newVar}
        </Text>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
