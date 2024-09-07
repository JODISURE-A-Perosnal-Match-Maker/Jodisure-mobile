import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import theme from '../../theme/theme'
import Theme from '../../components/Theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../navigation';
import { autoGenPreferences, genUUID, updateProfile, uploadDisplayPic, uploadGallaryImage } from '../../services/UserService';
import FullScreenLoader from '../../theme/FullScreenLoader';
import { ScrollView } from 'react-native';
import { signout } from '../../services/AuthService';
import { showMessage } from 'react-native-flash-message';


const UpdateDisplayPicture = () => {
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

    useEffect(() => {
        const { uid } = userC;
        if (!uid) return;
        console.log(userC?.profile?.UUID);
        if (!userC?.profile?.UUID) {
            (async () => {
                await genUUID(uid);
            })();

        }
    }, [userC.uid])

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

    const handleSubmit = () => {
        const values = {};
        values.isDpCompleted = true;
        values.status = "approve";
        values.onboarded = true;

        setLoading(true);
        autoGenPreferences()
            .then(res => {
                return updateProfile(values)
            })
            .then(res => {
                return showMessage({ message: 'Profile updated', type: "success" });
                // navigation.replace('ChooseAccount');
            }).then(() => {
                return signout();
            }).catch(err => {
                console.log(err);
                showMessage({ message: 'Profile updation failed!', type: "danger" })
            })
    };


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {loading ? <FullScreenLoader /> : null}
            {/* <Text>
                {JSON.stringify(pic, null, 2)}
            </Text> */}
            <Avatar
                source={pic?.url ? { uri: pic.url } : require('../../assets/images/avatar.png')}
                size={"xlarge"}
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
                onPress={showImagePicker}
                activeOpacity={0.7}
                containerStyle={{ backgroundColor: theme.colors.primary, marginBottom: 30 }}
            />
            <View>
                {!pic ? <Theme.TextB size={"30px"} style={{ textAlign: 'center' }}>Add your photo to complete your profile</Theme.TextB> : <Theme.TextB size={"30px"} style={{ textAlign: 'center' }}>Great! now you can submit your profile</Theme.TextB>}

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
                        color={theme.colors.primary}
                    />
                }
                type='outline'
                title=" Add from Gallery"
            />
            {pic && <View style={styles.submitContainer}>
                <Theme.Text style={{ textAlign: 'center' }}>
                    Once submitted your profile will be reviewd by our team and you will be notified. You will have to relogin for security reasons.
                </Theme.Text>
                <Button
                    containerStyle={{ marginVertical: 20 }}
                    raised
                    onPress={handleSubmit}
                    title="Complete Profile"
                />
            </View>}
        </ScrollView>
    )
}

export default UpdateDisplayPicture

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