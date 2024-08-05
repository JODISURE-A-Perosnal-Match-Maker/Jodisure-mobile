import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import Template from './Template';
import { UserContext } from '../../../navigation'
import { setTemplate } from '../../../services/UserService';
import { SafeAreaView } from 'moti';

const ChooseTheme = () => {
    const [templates, setTemplates] = useState([]);
    const [busy, setBusy] = useState(false);
    const userData = useContext(UserContext);
    useEffect(() => {
        firestore().collection('templates').get().then(querySnapshot => {
            const docs = [];
            querySnapshot.forEach(documentSnapshot => {
                docs.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
            });
            setTemplates(docs);
        })
    }, []);
    const handleselection = (template) => {
        setBusy(true);
        setTemplate(template).then(res => {

        }).finally(() => {
            setBusy(false);
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* <Text>{JSON.stringify(userData.profile.selectedTemplate.id,null,2)}</Text> */}
                {templates.map(template => (<Template key={template.id} busy={busy} template={template} userData={userData} setIsSelected={handleselection} showSelectionButton={true} />))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChooseTheme

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight + 10,
    }
})