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
    position: 'absolute',
    top: 30,
    left: 175
  },
  slider_style: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 },
  sliding_img_style: { width: 320, height: 250, resizeMode: 'cover', marginTop: 35, borderRadius: 20 },
  dai_sadana_style: { color: 'black', fontSize: 18, fontWeight: 'bold', marginLeft: 30, marginTop: 20, marginBottom: 10 },
  cards_style: { flex: 1, margin: 10, height: 200, width: 150, marginTop: 20, borderRadius: 20, alignItems: 'center' },
  footer: { backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, marginTop: 10 },

  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  popupContainer: {
    position: 'absolute',
    top: 80,
    left: 110,
    zIndex: 1,
  },
  popup: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black'
  },
  closeText: {
    color: 'white',
    textAlign: 'center',

  },
  cancel_button: {
    height: 35,
    width: 60,
    backgroundColor: '#a486de',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 8,
    marginTop: 15,
  },
  msg_box: {
    minHeight: 40,
    width: 200,
    backgroundColor: '#efefef',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginVertical:10
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    width: 10,
    height: 10,
    borderRadius: 5
  }

})

export default styles