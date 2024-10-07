import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import styles from './styles/styles_sliding_img.js'


const { width: screenWidth } = Dimensions.get('window')

const SlidingImageCarousel = () => {

    const [images, setimages] = useState([
        { id: '1', src: require('./sliding_img/img1.jpg') },
        { id: '2', src: require('./sliding_img/img2.jpg') }
    ])

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <Image source={item.src} style={styles.image} />
            </View>
        )
    }
    console.log(styles)
    return(
        
        <View style={styles.container}>
            <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth*0.8}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.7}
            slideStyle={{paddingHorizontal:5}}
            containerCustomStyle={styles.contentContainer}
            contentContainerCustomStyle={styles.contentContainer}
            />
        </View>
    )
}

export default SlidingImageCarousel 