import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import images from '../helper/images.js'


export default class Squares_3hrs extends React.Component {
  
  getHours = () => {
      var date = new Date(this.props.dt*1000)
      var hours = date.getHours()
      var ampm = hours >= 12 ? 'pm' : 'am'; hours = hours % 12;
      hours = hours ? hours : 12;
      return hours + ampm
     }
   
        render(){
    return <View style={styles.square}>
                <Text style={{fontSize: 10, fontFamily:'RobotoMono' }}>{ this.getHours() }</Text>
                <Image source = {images[this.props.weather[0].icon]} style={styles.image}/>
                <Text style={{ fontSize:12, fontFamily:'RobotoMono' }}>{Math.round(this.props.main.temp)}°C</Text>
          </View>
    }
}

const styles = StyleSheet.create({
    square: {
        width: 80,
        height: '100%',
        borderWidth: 1,
        borderColor: 'white',
        justifyContent:'space-around',
        alignItems:'center'
      

    },
    image: {
        width: 30,
        height: 30,
       
    }
})
