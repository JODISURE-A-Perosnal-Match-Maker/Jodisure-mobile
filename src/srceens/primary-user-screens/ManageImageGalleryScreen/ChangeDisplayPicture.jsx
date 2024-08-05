import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { autoGenPreferences, updateProfile, uploadDisplayPic } from '../../../services/UserService';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { UserContext } from '../../../navigation';
import Theme from '../../../components/Theme';
import theme from '../../../theme/theme';
const ChangeDisplayPicture = () => {
    const userC = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState();

    useEffect(() => {
        const { uid } = userC;
        if (!uid) return;
        setLoading(true);
        const subscriber = firestore().collection('users').doc(uid).collection('images').doc('dp').onSnapshot(doc => {
            setLoading(false);
            if (doc.exists) {
                setPic(doc.data());
            }
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
                return uploadDisplayPic(userC.uid, fileName, res.path);
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
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {loading && <FullScreenLoader />}
            {/* <Text>
                {JSON.stringify(pic, null, 2)}
            </Text> */}
            <Avatar
                source={
                    {
                        uri: pic?.url
                    }
                }
                size={"xlarge"}
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                containerStyle={{ backgroundColor: theme.colors.primary, marginBottom: 30 }}
            />
            <View>
                {pic && <Theme.TextB size={"30px"} style={{ textAlign: 'center' }}>DP is used when shown your thumbnail and in your Bio.</Theme.TextB>}
                <View style={{ marginVertical: 10 }}></View>
                <Theme.Text style={{ textAlign: 'center' }}>Picture speaks a thousand words about you. Choose one that describes you the best. Your picture is only visible to your contact.</Theme.Text>
            </View>
            <View style={{ marginTop: 10, marginBottom: 20 }}></View>
            <Button
                onPress={showImagePicker}
                icon={
                    <Icon
                        name="camera"
                        size={15}
                        color={theme.colors.white}
                    />
                }
                type='solid'
                title=" Add from Gallery"
            />
        </ScrollView>
    )
}

export default ChangeDisplayPicture

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 32,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitContainer: {
        marginTop: 20,
    }
})