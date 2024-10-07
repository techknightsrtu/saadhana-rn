import React from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'


const Katha=()=>{
    return(
        <View style={{flex:1}}>
            <WebView 
            style={{flex:1}}
            source={{uri:'https://prabhupadaradio.com/'}}
            />
        </View>
    )
}

export default Katha