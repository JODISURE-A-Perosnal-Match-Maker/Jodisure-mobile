import React from "react"
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import Theme from "../components/Theme"


const ContactUs = () => {
    const handlePress = () => {
        Linking.openURL('https://jodisure.com/');
    }
    const handlePressEmail = () => {
        Linking.openURL('mailto:admin@jodisure.com');
    }
    const handlePressPhone = () => {
        Linking.openURL('whatsapp://send?phone=9748548623&text=Hello%20JodiSure%20Admin%20!');
    }
    return (
        <>

            <View style={styles.imageContainer}>
                <View >
                    <Image style={{ width: 130, height: 130 }} source={require('../assets/images/splash_icon.png')}></Image>
                </View>
                <View>
                    <Image style={{ width: 200, height: 40 }} source={require('../assets/images/Logo.png')}></Image>
                </View>
            </View>
            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.textContainer}>
                        <Theme.TextB color="#000000" style={styles.textJustify} size="14px">We take your feedback seriously. If you have encountered an issue with the app or have a suggestion for
                            improvement, this is the place to let us know.</Theme.TextB>
                        <View style={{ paddingTop: 15, paddingBottom: 10 }}>
                            <Theme.TextB color="#b2578e" style={styles.textHead} size="14px">What can you report here?</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Bugs or technical issues with the app.</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Difficulty using a specific feature.</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Issues with account login or functionality.</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Suggestions for improving the app&#39;s design or features.</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Concerns about content moderation or safety.</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Personal attacks or abusive language.</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Spam or irrelevant information.</Theme.TextB>
                        </View>
                        <View style={styles.text}>
                            <View style={styles.bullet} />
                            <Theme.TextB color="#000000" size="13px">Issues requiring immediate technical support (e.g., account lockout)</Theme.TextB>
                        </View>

                        <View>
                            <View style={{ paddingTop: 15, paddingBottom: 10 }}>
                                <Theme.TextB color="#b2578e" style={styles.textHead} size="14px">How to Submit a Grievance:</Theme.TextB>
                            </View>
                            <View style={styles.text}>
                                <View style={styles.bullet} />
                                <Theme.TextB color="#000000" size="13px">Briefly describe the issue or suggestion you are experiencing.</Theme.TextB>
                            </View>
                            <View style={styles.text}>
                                <View style={styles.bullet} />
                                <Theme.TextB color="#000000" size="13px">If applicable, include screenshots or additional details that help us understand the problem.</Theme.TextB>
                            </View>
                            <View style={styles.text}>
                                <View style={styles.bullet} />
                                <Theme.TextB color="#000000" size="14px">What happens next?</Theme.TextB>
                            </View>
                            <View style={styles.text}>
                                <View style={styles.bullet} />
                                <Theme.TextB color="#000000" size="13px">We will review your grievance and respond within two business days.</Theme.TextB>
                            </View>
                            <View style={styles.text}>
                                <View style={styles.bullet} />
                                <Theme.TextB color="#000000" size="13px">For technical issues, we will aim to provide a solution or workaround.</Theme.TextB>
                            </View>
                            <View style={styles.text}>
                                <View style={styles.bullet} />
                                <Theme.TextB color="#000000" size="13px">For suggestions, we will consider your feedback for future app updates.</Theme.TextB>
                            </View>

                            <View>
                                <Theme.TextB color="#000000" style={styles.texttitle} size="14px">Thank you for helping us make JodiSure a better experience for everyone!
                                    Additional Resources:</Theme.TextB>
                            </View>
                            <Text style={styles.text}>
                                <Theme.TextB color="#969696" style={styles.text} size="13px">Learn more about our privacy policy, please visit:</Theme.TextB> <TouchableHighlight onPress={handlePress} underlayColor="transparent">
                                    <Text style={styles.linkText}>JodiSure</Text>
                                </TouchableHighlight>
                            </Text>

                            <View>
                                <Theme.TextB color="#000000" style={styles.texttitle} size="14px">Contact Us.</Theme.TextB>
                            </View>
                            <Text style={{ color: '#969696', fontSize: 13 }}>
                                Email id – <TouchableHighlight onPress={handlePressEmail} underlayColor="transparent">
                                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>admin@jodisure.com</Text>
                                </TouchableHighlight>
                            </Text>
                            <Text style={{ color: '#969696', fontSize: 13,marginBottom:15 }}>
                                WhatsApp – <TouchableHighlight onPress={handlePressPhone} underlayColor="transparent">
                                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>+91 97485 48623</Text>
                                </TouchableHighlight>
                            </Text>

                        </View>
                    </View>

                </ScrollView>
            </View>

        </>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    imageContainer: {
        // flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 10
    },
    textContainer: {
        width: 380,
    },
    textJustify: {
        textAlign: 'justify',
    },
    textHead: {
        fontSize: 18,
        // textDecorationLine: 'underline'
    },
    textsubHead: {
        fontSize: 18,
        // textDecorationLine: 'underline',
        paddingTop: 5
    },
    texttitle: {
        fontSize: 18,
        paddingTop: 10
    },
    text: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: 'black',
        marginRight: 10,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        padding: 10
    },
})