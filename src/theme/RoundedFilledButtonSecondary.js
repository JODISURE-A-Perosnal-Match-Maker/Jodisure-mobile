import React from 'react'
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import theme from './theme';

const RoundedFilledButtonPrimary = (props) => {
  return (
    <Button
      containerStyle={styles.container}
      titleStyle={styles.titleStyle}
      type="outline"
      {...props}
    />
  )
}

export default RoundedFilledButtonPrimary

const styles = StyleSheet.create({
  container:{
    borderColor:theme.colors.primaryDark,
    backgroundColor:theme.colors.primary,
    // padding: 4,
    margin: 4,
    width: '100%',
    borderRadius:12,
    borderWidth:3
  },
  titleStyle: { 
    color: theme.colors.black,
    fontSize:16,
    fontFamily: theme.font.bold
  }
})
