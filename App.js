import React, { Fragment } from 'react';
import { AppLoading, Font } from 'expo'
import { Asset } from 'expo-asset'

import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import { getDate, getTime } from './helper/date.js'
import images from './helper/images.js'
import Squares_3hrs from './components/squares_3hrs.js'
import Squares_weekly from './components/squares_weekly.js'
import GooglePlacesInput from './components/autoComplete.js'





export default class App extends React.Component {
  state = {
    name: '',
    temp: null,
    temp_max: null,
    temp_min: null,
    description: '',
    humidity: null,
    pressure: null,
    wind: null,
    clouds: null,
    country: null,
    sunrise: null,
    sunset: null,
    date: null,
    icon: null,
    list: [],
    weeklyWeather: [],
    modalVisible: false,
    isLoadingComplete: false,
    dataLoaded: false
  }

  componentDidMount() {
    Font.loadAsync({
      'RobotoMono': require('./assets/fonts/RobotoMono-Regular.ttf'),
    });
    this.getLocation()
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      this.getCurrentWeather(latitude, longitude)
      this.getEveryThreeHours(latitude, longitude)
      this.getWeeklyWeather(latitude, longitude)
    })
  }

  getCurrentWeather = (latitude, longitude) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${'16909a97489bed275d13dbdea4e01f59'}`)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          name: resJson.name,
          temp: resJson.main.temp,
          temp_max: resJson.main.temp_max,
          temp_min: resJson.main.temp_min,
          description: resJson.weather[0].description,
          humidity: resJson.main.humidity,
          pressure: resJson.main.pressure,
          wind: resJson.wind.speed,
          clouds: resJson.clouds.all,
          country: resJson.sys.country,
          sunrise: getTime(resJson.sys.sunrise),
          sunset: getTime(resJson.sys.sunset),
          date: getDate(resJson.dt),
          icon: resJson.weather[0].icon
        })
      })
      .catch(error => console.log(error))
  }

  getEveryThreeHours = (latitude, longitude) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${'16909a97489bed275d13dbdea4e01f59'}`)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          list: resJson.list,
          dataLoaded: true,
          
        })
      })
      .catch(error => console.log(error))
  }

  getWeeklyWeather = (latitude, longitude) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&units=metric&APPID=${'16909a97489bed275d13dbdea4e01f59'}`)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          weeklyWeather: resJson.list
        })
      })
      .catch(error => console.log(error))
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  _handleLoadingError = error => {
    console.warn(error);
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icons/01d.png'),
        require('./assets/icons/02d.png'),
        require('./assets/icons/03d.png'),
        require('./assets/icons/04d.png'),
        require('./assets/icons/09d.png'),
        require('./assets/icons/10d.png'),
        require('./assets/icons/11d.png'),
        require('./assets/icons/13d.png'),
        require('./assets/icons/50d.png'),
        require('./assets/icons/01n.png'),
        require('./assets/icons/02n.png'),
        require('./assets/icons/03n.png'),
        require('./assets/icons/04n.png'),
        require('./assets/icons/09n.png'),
        require('./assets/icons/10n.png'),
        require('./assets/icons/11n.png'),
        require('./assets/icons/13n.png'),
        require('./assets/icons/50n.png'),
        require('./assets/fonts/RobotoMono-Regular.ttf')

      ]),
    ]);
  };


  render() {
    if (!this.state.isLoadingComplete || !this.state.dataLoaded ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    } else {
      return (
        <Fragment>
          <SafeAreaView style={{ flex: 0, backgroundColor: '#52c78c' }} />

          <View style={styles.container}>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{ marginTop: 22, height: '50%' }}>

                <GooglePlacesInput getCurrentWeather={this.getCurrentWeather}
                  getEveryThreeHours={this.getEveryThreeHours}
                  getWeeklyWeather={this.getWeeklyWeather}
                  setModalVisible={this.setModalVisible} />

                <Button
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  title="Close"
                  buttonStyle={{ backgroundColor: '#52c78c' }}
                  accessibilityLabel="close button"

                />
              </View>

            </Modal>

            <View style={styles.top}>
              <View style={styles.header_1}>

                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }} >

                  <Image source={require('./assets/icons/placeholder.png')} style={styles.icon_m} />

                </TouchableHighlight>


                <Text style={{ color: 'white', fontWeight: 'bold', fontFamily:'RobotoMono' }}>{this.state.date}</Text>

                <TouchableHighlight onPress={() => {
                  this.componentDidMount()
                }}>
                  <Image source={require('./assets/icons/home.png')} style={styles.icon_m} />
                </TouchableHighlight>

              </View>

              <View style={styles.header_2} >
                <Text style={{ fontSize: 30, fontWeight:'900', paddingTop: '3%', fontFamily:'RobotoMono'  }}>{
                  this.state.name
                }</Text>
              </View>
            </View>


            <View style={styles.main_top}>
              <View style={styles.main_top_1}>
                <Image source={images[this.state.icon]} style={{ width: 100, height: 100 }} />
                <Text style={{fontFamily:'RobotoMono'}}>{this.state.description}</Text>
              </View>

              <View style={styles.main_top_2} >
                <Text style={styles.sun_temp} ><Image source={require('./assets/icons/sunrise.png')} style={styles.icon_s} />{this.state.sunrise}
                  <Image source={require('./assets/icons/sunset.png')} style={styles.icon_s} />{this.state.sunset}
                </Text>
                <Text style={{ color: '#194d33', fontSize: 50, fontFamily:'RobotoMono'  }}>{Math.round(this.state.temp)}°C
              </Text>
                <Text style={styles.sun_temp} ><Image source={require('./assets/icons/warm.png')} style={styles.icon_s} />{Math.round(this.state.temp_max)}°C
              <Image source={require('./assets/icons/cold.png')} style={styles.icon_s} />{Math.round(this.state.temp_min)}°C</Text>
              </View>
            </View>

            <View style={styles.main_mid}>
              <View style={styles.main_mid_1}>
                <Text style={styles.main_mid_1_text}><Image source={require('./assets/icons/humidity.png')} style={styles.icon_s} />{this.state.humidity}%</Text>
                <Text style={styles.main_mid_1_text}><Image source={require('./assets/icons/pressure.png')} style={styles.icon_s} />{this.state.pressure}hPa</Text>
                <Text style={styles.main_mid_1_text}><Image source={require('./assets/icons/windy.png')} style={styles.icon_s} />{this.state.wind}m/s</Text>
                <Text style={styles.main_mid_1_text}><Image source={require('./assets/icons/03d.png')} style={styles.icon_s} />{this.state.clouds}%</Text>
              </View>
              <ScrollView horizontal={true} style={styles.main_mid_2} >
                {
                  this.state.list.map((ele, index) => {
                    if (index < 9) {
                      return <Squares_3hrs key={index} {...ele} />
                    }

                  })
                }
              </ScrollView>
            </View>

            <View style={styles.main_bottom}>
              <ScrollView vertical={true} style={styles.main_bottom_1} >
                {
                  this.state.weeklyWeather.map((ele, index) => {
                    if (index > 0)
                      return <Squares_weekly key={index} {...ele} />
                  })
                }
              </ScrollView>
            </View>



            <View style={styles.bottom}>
              <Text style={{ color: 'white', fontSize: 15, fontFamily:'RobotoMono' }} >{this.state.country}</Text>
            </View>
          </View>
        </Fragment>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 2.5,
    width: '100%',
  },
  bottom: {
    flex: 1,
    backgroundColor: '#52c78c',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  header_1: {
    height: '45%',
    paddingTop: '1%',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%'
  },
  header_2: {
    height: '55%',
    alignItems: 'center',
    backgroundColor: '#e6fff2'
  },
  main_top: {
    flex: 3.5,
    flexDirection: 'row',
    width: '100%',
    paddingTop: '2%'
  },
  main_top_1: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '2%'
  },
  main_top_2: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  main_mid: {
    flex: 4,
    width: '100%',
    flexDirection: 'column'
  },
  main_mid_1: {
    height: '50%',
    paddingTop: '1%',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly'

  },
  main_mid_2: {
    height: '50%',
    backgroundColor: '#e6fff2',
    flexDirection: 'row',
  },

  main_bottom: {
    flex: 4.5,
    width: '100%',
    flexDirection: 'column'
  },

  main_bottom_1: {
    height: '100%'
  },
  
  icon_s: {
    width: 20,
    height: 20,
  },
  icon_m: {
    width: 30,
    height: 30,
  },
  sun_temp: {
    fontFamily:'RobotoMono' 
  },
  main_mid_1_text: {
    fontFamily:'RobotoMono',
    paddingLeft: '2%' 
  }

});
