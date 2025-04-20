import React, { Component, useState } from 'react'; 
import { StyleSheet, View, Text, Button, Alert, TextInput, FlatList } from 'react-native'; 

const MyTinerary = () => {

  const _onButtonPress = () => {
    console.log("Button is pressed!"); 
    Alert.alert('You have pressed the button!!'); 
  }

  // User input
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
      setIsFocused(true);
  };

  const handleTextChange = (newText) => {
      setText(newText);
      if (newText.length > 0) {
          setIsFocused(true);
      }
  };

  return (
    <View style={[styles.container]}>
      <View style={{flex:2, flexDirection:'column', alignItems:'left', padding:20, backgroundColor:'powderblue'}}>
        <Text style={[styles.heading]}>MyTinerary</Text>

        {/* Typing and adding an item to list */}
        <Text style={styles.subheading}>ACTIVITY</Text>
        {/*<TextInput style={[styles.TextInput]}>What do you want to experience?</TextInput>*/}
        <View style={[styles.TextInput]}>
          <TextInput
            placeholder={!isFocused ? 'What do you want to experience?' : ''}
            onFocus={handleFocus}
            onChangeText={handleTextChange}
            value={text}
          />
        </View>
        
        <Button
          title="+ Add item"
          onPress={_onButtonPress}
          color='steelblue'
        />
      </View>

      {/* Displaying the list */}
      <View style={{flex:4, flexDirection:'column', alignItems:'left', padding:20, backgroundColor:'pink'}}>
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

export default MyTinerary;