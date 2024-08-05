import React, { useContext, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import theme from '../../../theme/theme';
import { UserContext } from '../../../navigation';
import RoundDarkButton from '../../../components/RoundDarkButton';
import PhotoCard from './PhotoCard';
import { uploadGallaryImage } from '../../../services/UserService';
import FullScreenLoader from '../../../theme/FullScreenLoader';


const ManageImageGalleryScreen = () => {
    const userC = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [pics, setPics] = useState([]);

    useEffect(() => {
        const { uid } = userC;
        if (!uid) return;
        const subscriber = firestore().collection('users').doc(uid).collection('images').onSnapshot(querySnapshot => {
            const timages = [];
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.id ==='dp'){
                    timages.unshift({ id: documentSnapshot.id, ...documentSnapshot.data() })
                }else{
                    timages.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
                }
            });
            setPics(timages);
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [userC.uid]);

    const showImagePicker = () => {
        console.log('launching image library');
        ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo',
            // includeBase64:true,
            cropping: true,
        }).then(res => {
            setLoading(true);
            if (res.path) {
                const splits = res.path.split('/');
                const fileName = splits[splits.length - 1];
                return uploadGallaryImage(userC.uid, fileName, res.path);
            }
            throw new Error('Upload failed');
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log('error on image picker', err);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <React.Fragment>
            <View style={styles.container}>
                {loading && <FullScreenLoader loading={loading} />}
                <View style={styles.photoContainer}>
                    <FlatList
                        data={pics}
                        renderItem={({ item }) => <PhotoCard uid={userC.uid} imageObject={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <RoundDarkButton onPress={showImagePicker} name="Add Photo" />
                </View>
            </View>
        </React.Fragment>
    )
}

export default ManageImageGalleryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    photoContainer: {
        flex: 1
    },
    buttonContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
})
