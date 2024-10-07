import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    contentcontainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    scroll_style: { flex: 1, backgroundColor: 'white' },
    HK_style: { fontSize: 25, fontWeight: 'bold', color: 'black', marginTop: 30, marginLeft: 10 },
    logo_style: {
      height: 45,
      width: 45,
      borderRadius: 22.5,
      marginLeft: 170,
      marginTop: 30,
    },
    slider_style: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 },
    sliding_img_style: { width: 320, height: 250, resizeMode: 'cover', marginTop: 35, borderRadius: 20 },
    dai_sadana_style: { color: 'black', fontSize: 18, fontWeight: 'bold', marginLeft: 30, marginTop: 20,marginBottom:10},
    cards_style: { flex: 1, margin: 10, height: 200,width:150, marginTop: 20, borderRadius: 20,alignItems:'center' },
    footer:{backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, marginTop: 10 },

    loadingcontainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white'
    }
  


  })

export default styles