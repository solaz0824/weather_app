import React from 'react'
import { View, StyleSheet, Image, Text} from 'react-native'
import images from '../helper/images.js'



export default class Squares_weekly extends React.Component {
    getDays = () => {
        var date = new Date(this.props.dt * 1000)
        var date_str = date.toString()
        var day = date_str.split(' ')[0]
        return day
    }
    render() {
       
        return  <View style={styles.square}>
            <View style={styles.flex}>
                <Text style={{ fontSize: 20,  fontFamily:'RobotoMono'  }}>{this.getDays()}</Text>
            </View>
            <View style={styles.flex}>
                <Image source={images[this.props.weather[0].icon]} style={styles.image} />
            </View>
            <View style={styles.flex}>
                <Text style={styles.temp}>{Math.round(this.props.temp.max)}°C</Text>
            </View>
            <View style={styles.flex}>
                <Text style={styles.temp}>{Math.round(this.props.temp.min)}°C</Text>
            </View>

        </View>
    }
}


const styles = StyleSheet.create({
    square: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems:'center'

    },
    image: {
        width: 30,
        height: 30,
    },
    flex : {
        width: '25%',
        paddingLeft: '7%'
    },
    temp: {
        fontSize: 15,
        fontFamily:'RobotoMono'
    }
})