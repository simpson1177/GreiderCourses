import React, {Component,useEffect,useState} from "react"
import { render } from "react-dom";
import {View,StyleSheet,Animated} from "react-native"

const Ball = () =>  {

   const [position, setPosition] = useState(new Animated.ValueXY(0,0)) 

useEffect(() => {
    
    Animated.spring(position, {
        toValue: {x: 200, y: 500}}).start();
    },[])



    return (
    <Animated.View style={position.getLayout()} >
    <View style={styles.ball}></View>
    </Animated.View>
    
    )
    


}
    




const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: "black"
    }
}

export default Ball