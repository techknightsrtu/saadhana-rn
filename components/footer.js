import styles from './styles/styles_home'
import { View, Text, Image} from 'react-native';

const Version=()=>{
    return(
        <View>
          
          <View style={styles.footer}>
            <Text style={{ color: '#9a9a9a', fontStyle: 'sans-serif', marginBottom: 20, marginTop: 30 }}>Hare Krishna Hare Krishna, Krishna Krishna Hare Hare {"\n"}      Hare Rama Hare Rama, Rama Rama Hare Hare</Text>
            <Image style={{ marginBottom: 10 }} source={require('./images/saadhana_logo_or.png')} />
            <Text style={{ color: '#9a9a9a' }}>Matasya-1.0.2</Text>

          </View>
        </View>
    )
}
export default Version