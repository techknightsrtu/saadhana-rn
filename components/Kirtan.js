import React from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'


const Kirtan=()=>{
    return(
        <View style={{flex:1}}>
            <WebView 
            style={{flex:1}}
            source={{uri:'https://prabhupadavani.org/audio/srila-prabhupadas-bhajans-kirtans/'}}
            />
        </View>
    )
}

export default Kirtan