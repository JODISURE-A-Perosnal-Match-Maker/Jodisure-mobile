import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-native-elements'
import Theme from '../../../components/Theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FullScreenLoader from '../../../theme/FullScreenLoader';
import { FlatList, ScrollView } from 'react-native'
import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get("screen");
const Template = ({ template, busy, userData, setIsSelected, showSelectionButton, hideMask }) => {
    const [isTemplateSelectedByUser, setIsTemplateSelectedByUser] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (userData?.profile?.selectedTemplate?.id && userData.profile.selectedTemplate.id === template.id) {
            setIsTemplateSelectedByUser(true);
        } else {
            setIsTemplateSelectedByUser(false);
        }
        const images = [];
        if (template?.preview_1) {
            images.push(template.preview_1);
        }
        if (template?.preview_2) {
            images.push(template.preview_2);
        }
        if (template?.preview_3) {
            images.push(template.preview_3);
        }
        if (template?.preview_4) {
            images.push(template.preview_4);
        }
        setPreviewImages(images);
    }, [template, userData])
    return (
        <View style={styles.container}>
            {busy ? <FullScreenLoader /> : null}
            <Card>
                <Card.Title><Theme.TextB>{template.name}</Theme.TextB></Card.Title>
                <View>
                    {/* <Text>{JSON.stringify(template, null, 2)}</Text> */}
                    {/* <Image source={{ uri: template.preview_1 }} style={styles.image} /> */}
                    <FlatList
                        data={previewImages}
                        renderItem={
                            ({ item }) => (
                                <View style={{ margin: 20 }}>
                                    <Image source={{ uri: item }} style={styles.image} />
                                </View>
                            )
                        }
                        horizontal={true}
                    />
                    {!hideMask && isTemplateSelectedByUser ? (
                        <View style={styles.maskedContainer}>
                            <View style={styles.checkContainer}>
                                <Ionicons name='checkmark-circle-sharp' size={40} color="green" />
                            </View>
                        </View>
                    ) : null}

                </View>
                {showSelectionButton && <View style={styles.buttonContainer}>
                    <Button title="Select" onPress={() => setIsSelected(template)} />
                </View>}
            </Card>

        </View>
    )
}

export default Template

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    maskedContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%'
    },
    checkContainer: {
        top: '48%',
        left: '48%'
    },
    image: {
        padding: 0,
        height: 200 * 1.414,
        width: 200
    },
    buttonContainer: {
        paddingVertical: 12
    },
    imageGrid: {
        // flexDirection: "column",
        // flex: 1,
        // height: "100%",
        // width: "100%",
        // backgroundColor: 'red'
    }
})