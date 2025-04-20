import React, {Component, useState} from 'react'; 
import {StyleSheet, View, Text, Button, Alert, TextInput, FlatList} from 'react-native'; 

export default class Flex extends Component {

  _onButtonPress = () => {
    console.log("Button is pressed!"); 
    Alert.alert('You have pressed the button!!!'); 
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={{flex:1, flexDirection:'column', alignItems:'left', padding:20}}>
          <Text style={[styles.heading]}>MyTinerary</Text>

          {/* Typing and adding an item to list */}
          <Text style={styles.subheading}>ACTIVITY</Text>
          <TextInput style={[styles.TextInput]}>What do you want to experience?</TextInput>
          <Button
            title="+ Add item"
            onPress={this._onButtonPress}
            color='steelblue'
          />
        </View>

        {/* Displaying the list */}
        <View style={{flex:1, flexDirection:'column', alignItems:'left', padding:20}}>
          <Text style={[styles.subheading]}>TO DO</Text>
          <FlatList
            data={[
              {name: 'activity1'},
              {name: 'activity2'},
              {name: 'activity3'},
            ]}
            renderItem={
              ({item}) => <Text style={styles.item}>{item.name}</Text>
            }
          />
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    padding: 20,
  }, 
  heading: {
    fontWeight: 'bold', 
    fontSize: 42,
    paddingBottom: 20,
  }, 
  subheading: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#f6f6f6',
    marginTop: 5,
    marginBottom: 10,
    // inner text styles
    color: 'grey',
    paddingLeft: 10,
    paddingRight: 10,
    fontStyle: 'italic',
  },
  item: {
    fontSize: 16,
    paddingBottom: 10,
  },
});