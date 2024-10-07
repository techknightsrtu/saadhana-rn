import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import styles from './styles/styles_login';

const KKB = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:'#f1fdf1',justifyContent:'center',alignItems:'center'}}>
        <Image
        style={{height:100,width:100,resizeMode:'contain'}}
        source={require('./images/prabhupada.png')}
        />
        <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
    <Text style={styles.text_out}>Prabhupada Radio</Text>
    </View>

    <TouchableOpacity  style={[styles.boxes,{marginTop:70}]} onPress={()=>navigation.navigate('Kirtan')}>
      <Text style={styles.text_in}>Kirtan</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.boxes,{marginTop:70}]} onPress={()=>navigation.navigate('Katha')}>
    <Text style={styles.text_in}>Katha</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.boxes,{marginTop:70}]} onPress={()=>navigation.navigate('Books')}>
    <Text style={styles.text_in}>Books</Text>
    </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  boxes:{
    width:300,
    backgroundColor:'#000080',
    height:70,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  text_out:{
      fontSize:28,
      fontWeight:'bold',
      color:'black'
  },
  text_in:{
    fontSize:25,
    fontWeight:'bold',
    color:'white'
  }
})
export default KKB