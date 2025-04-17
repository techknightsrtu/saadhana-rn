import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    boxes: {
        backgroundColor: 'white',
        width: 330,
        borderRadius: 20,
        padding: 15,
        marginTop: 15,
        elevation: 1,
        justifyContent: 'center',
        marginLeft: 13
        // alignItems:'center'
        // flexDirection:'column'
    },
    optionbutton: {
        padding: 15,
        marginHorizontal: 30
    },
    selectedbutton: {

    },
    selectedOption: {
        color: 'white'
    },
    optiontxt: {
        color: 'black',
        fontSize: 17
    },
    selectedtxt: {
        color: 'white',
        fontWeight: 'bold'
    },
    selectedLine: {
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        alignSelf: 'center'

    },
    saadhana_body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    saadhana_title: {
        width: '32%',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    saadhana_data: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        margin: 5
    },
    adjustablebox: {
        width: 330,
        backgroundColor: '#efefef',
        borderRadius: 10,
        padding: 10,
        margin: 2,
        minHeight: 50,
        flexShrink: 1,
    },
    reviewbutton: {
        backgroundColor: '#109e54',
        height: 45,
        width: 290,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textonbox: {
        zIndex: 1,
        position: 'absolute',
        top: 78,
        left: 35,
        backgroundColor: 'white',
        color: 'gray',
        fontSize: 12,
        paddingHorizontal: 5
    },
    inp_boxes: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        marginTop: 30,
        borderRadius: 5,
        margin: 5,
        paddingLeft: 10,
        color: 'black',
        fontSize: 20
    },
    add_cancel: {
        height: 40,
        width: 70,
        backgroundColor: '#a486de',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        marginTop: 15,
        margin: 5
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',


    },
    modalView: {
        width: 300,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    comment_input: {
        height: 140,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        borderRadius: 5,
        marginTop: 10,
        fontSize: 17
    },
    feedbackBox: {
        minHeight: 100,
        flexShrink: 1,
        color: 'black',
        width: 250,
        fontSize: 15,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        textAlignVertical: 'top'
    },
    noSadhanaBox:{
        width: 320,
        backgroundColor: '#efefef',
        borderRadius: 10,
        padding: 10,
        margin: 20,
        minHeight: 40,
        flexShrink: 1,
    },
    saadhanaBox:{
        width: 320,
        minHeight: 500,
        backgroundColor: '#ffffff',
        marginVertical: 10,
        borderRadius: 10,
        elevation: 1,
        flexShrink: 1
    }



})
export default styles