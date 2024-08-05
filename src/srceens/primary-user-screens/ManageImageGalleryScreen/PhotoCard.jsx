import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Button, Card, Icon, Image } from 'react-native-elements'
import theme from '../../../theme/theme'
import ImageView from "react-native-image-viewing";
import { deleteGallaryImage } from '../../../services/UserService';
import Theme from '../../../components/Theme';
import { useNavigation } from '@react-navigation/native';

const PhotoCard = ({uid, imageObject }) => {
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();
    async function deleteImage() {
        if (!imageObject?.id) return;
        deleteGallaryImage(uid,imageObject.id).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log('Error deleting image',err);
        });
    }
    return (
        <View>
            <Card>
                {imageObject.id =='dp' && <Card.Title>
                    <Button type='clear' onPress={()=>{
                        navigation.navigate('ChangeDisplayPicture')
                    }} title={'Change Picture'} icon={
                        <Icon name="edit" size={20} color={theme.colors.primary}/>
                    }/>
                </Card.Title>}
                <Card.Image
                    PlaceholderContent={<ActivityIndicator color={theme.colors.primary} />}
                    resizeMode="cover"
                    style={{ height: 250 }}
                    source={{ uri: imageObject.url }}
                    onPress={() => {
                        setIsVisible(true);
                    }}
                >
                </Card.Image>
                {/* <Text>{JSON.stringify(imageObject, null, 2)}</Text> */}
                <Card.Divider />
                <View style={styles.buttonContainer}>
                    {imageObject.id !=='dp' && <Button
                        type="outline"
                        icon={<Icon name='delete' color={theme.colors.error} />}
                        buttonStyle={{ borderRadius: 50 }}
                        onPress={deleteImage}
                    />}
                </View>                
            </Card>
            <ImageView
                images={[{ uri: imageObject.url }]}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    )
}

export default PhotoCard

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
})

