import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import PhotoGrid from '../PhotoGrid';
import Theme from '../Theme';

const ProfilePhotoGrid = ({ images, postedBy}) => {
    const [visible, setIsVisible] = useState(false);
    const showImage = (image) => {
        setIsVisible(true);
    };
    // const images = [
    //     'https://images.pexels.com/photos/2998816/pexels-photo-2998816.jpeg?cs=srgb&dl=pexels-necati-anil-cakirman-2998816.jpg&fm=jpg',
    //     'https://images.pexels.com/photos/904117/pexels-photo-904117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //     'https://images.pexels.com/photos/3053504/pexels-photo-3053504.jpeg?cs=srgb&dl=pexels-nothing-ahead-3053504.jpg&fm=jpg',
    //     'https://images.pexels.com/photos/2598221/pexels-photo-2598221.jpeg?cs=srgb&dl=pexels-mattheus-wilkisom-dias-santos-2598221.jpg&fm=jpg',
    //     'https://images.pexels.com/photos/1807113/pexels-photo-1807113.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1807113.jpg&fm=jpg',
    //     'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg',
    //     'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
    // ];

    return (
        <View style={styles.container}>
            <PhotoGrid styles={{ position: 'absolute', width: '100%' }} postedBy={postedBy} source={images} onPressImage={source => showImage(source.uri)}></PhotoGrid>
            <ImageView
                images={images.map((i) => {
                    return { uri: i }
                })}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    )
}

export default ProfilePhotoGrid

const styles = StyleSheet.create({
    container:{
    }
})
