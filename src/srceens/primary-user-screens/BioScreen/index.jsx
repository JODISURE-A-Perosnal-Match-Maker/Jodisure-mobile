import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import FullScreenLoader from '../../../theme/FullScreenLoader';
import RoundDarkButton from '../../../components/RoundDarkButton';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../navigation';
import Template from './Template';
import Theme from '../../../components/Theme';
import { Card } from 'react-native-elements';

const BioScreen = () => {
    const navigation = useNavigation();
    const userData = useContext(UserContext);
    return (
        <ScrollView style={styles.container}>
            <View>
                {userData?.profile?.selectedTemplate ? (
                    <Template
                        userData={userData}
                        template={userData?.profile?.selectedTemplate}
                        showSelectionButton={false}
                        hideMask={true}
                    />
                ) : null}

                {!userData?.profile?.selectedTemplate ? (
                    <Card style={styles.errContainer}>
                        <Theme.Text style={{ textAlign: 'center' }}>You haven't selected any theme yet!</Theme.Text>
                    </Card>
                ) : null}

            </View>
            <View style={{ marginVertical: 20, marginHorizontal: 50 }}>
                <RoundDarkButton name={(!userData?.profile?.selectedTemplate) ? `Choose Theme` : `Change Theme`} onPress={() => {
                    navigation.navigate('ChooseTheme');
                }} />
            </View>
            <TouchableOpacity style={styles.controllBioContainer} onPress={() => {
                navigation.navigate('BioFieldControl');
            }}>
                <Theme.Text style={{ textAlign: 'center' }}>Control what is displayed on your Biodata</Theme.Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default BioScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    errContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    controllBioContainer: {
        padding: 16,
        borderColor: '#e4e4e4',
        borderWidth: 1,
        borderRadius: 14,
        marginHorizontal: 14,
    }
})