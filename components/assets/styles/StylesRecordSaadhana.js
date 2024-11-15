import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    boxes: {
        backgroundColor: 'white',
        width: 330,
        borderRadius: 20,
        padding: 15,
        marginTop: 15,
        elevation: 1
        // flexDirection:'column'
    },
    shloka: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 40,
        color: '#c0755d',

    },
    inp_boxes: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        marginTop: 14,
        borderRadius: 5,
        margin: 5,
        paddingLeft: 10,
        color: 'black',
        fontSize: 20,

    },
    wstext: {
        zIndex: 1,
        position: 'absolute',
        top: 6,
        left: 15,
        backgroundColor: 'white',
        color: 'gray',
        fontSize: 12,
        paddingHorizontal: 5
    },
    selectedbox: {
        backgroundColor: '#83f736',
        fontWeight: 'bold'
    },
    tickbox: {
        borderColor: 'black',
        borderRadius: 15,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        margin: 5
    },
    comment_input: {
        height: 140,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        borderRadius: 5,
        marginTop: 10,
        fontSize: 17
    },
    savebutton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 330,
        backgroundColor: '#b77662',
        borderRadius: 10,
        marginTop: 30,
        elevation: 1,
        marginBottom: 50

    },
    dates:{
        color:'grey',
        marginVertical:5,
        fontSize:14
    },
    edit:{
        color:'blue',
        marginVertical:5,
        fontSize:14,
        fontWeight:'bold',
        textDecorationLine:'underline'
    },
    loadingContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }



})

export default styles