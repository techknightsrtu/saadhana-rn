import React from "react";
import { View, Text, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';



const App = () => {

  const data = [
    require('./components/sliding_img/img1.jpg'),
    require('./components/sliding_img/img2.jpg')
  ];

  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover" source={require('./components/chakra.png')}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Top Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'pink', marginTop: 30, marginLeft: 10 }}>
              Hare {"\n"}Krishna !
            </Text>
          </View>
          <View>
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                marginLeft: 150,
                marginTop: 40,
                borderColor: 'pink',
                borderWidth: 1
              }}
              source={require('./images/saadhana_logo.png')}
            />
          </View>
        </View>

{/* sliding images  */}
        <View style={{ flex:1.4 }}>
      <Swiper
      autoplay={true}
        dotStyle={{ backgroundColor: 'rgba(255, 255, 255,0.8)', width: 10, height: 10, borderRadius: 5 }}
        activeDotStyle={{ backgroundColor: 'white', width: 10, height: 10, borderRadius: 5 }}
      >
        {data.map((image, index) => (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={image}
              style={{ width: 320, height: 350, resizeMode: 'cover',marginTop:30,borderRadius:20 }}
            />
          </View>
        ))}
      </Swiper>
    </View>

        {/* Bottom Section */}
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
          <View style={{ flex: 1, backgroundColor: '#ffdee7', margin: 10, height: 200,marginTop:30, marginLeft: 20, borderRadius: 20 }}>
            <Text style={{ color: '#f50294', margin: 20, fontSize: 18 }}>Record {"\n"}Saadhana</Text>
            <Image style={{ position: 'absolute', bottom: 0, right: 20, height: 80, width: 30 }} source={require('./images/sadana.png')} />
          </View>
          <View style={{ flex: 1, backgroundColor: '#feffd9', margin: 10, height: 200,marginTop:30, marginRight: 20, borderRadius: 20 }}>
            <Text style={{ color: '#ffb508', margin: 20, fontSize: 18 }}>Saadhana {"\n"}Report</Text>
            <Image style={{ position: 'absolute', bottom: 16, right: 20, height: 35, width: 30 }} source={require('./images/timer.png')} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default App;
