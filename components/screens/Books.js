import React from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'


const Books=()=>{
    return(
        <View style={{flex:1}}>
            <WebView 
            style={{flex:1}}
            source={{uri:'https://vedabase.io/en/'}}
            />
        </View>
    )
}

export default Books