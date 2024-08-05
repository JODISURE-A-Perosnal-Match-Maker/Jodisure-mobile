import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const SearchBox = () => {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Search" style={styles.input}/>
            <AntDesign style={styles.icon} name="search1" size={24} color="black" />
        </View>
    )
}

export default SearchBox

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        paddingVertical:14,
        paddingHorizontal:16,
        width:'100%',
        borderColor:'#979797',
        borderWidth:1,
        borderRadius:4,
    },
    icon:{
        position:'absolute',
        right:14
    }
})
