import React, { useState } from 'react'; 
import { StyleSheet, View, Text, Button, Alert, TextInput, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';

const MyTinerary = () => {
  // Input state
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);

  // Sets TextInput value to user input
  const handleTextChange = (newText) => {
    setInputText(newText);
  };

  // Add item to list
  const handleSubmit = () => {
    // Error handling: Cannot add empty item
    if (inputText.trim() === '') {
      Alert.alert('Please type an activity to add it to your itinerary.');
      return;
    }

    // Create a new item object (with a unique key)
    const newItem = {
      id: Date.now().toString(), // Unique key
      value: inputText,
      completed: false,    
    };

    // Add new item to the list
    setItems((prevItems) => [newItem, ...prevItems]);
    
    // Reset input text
    setInputText('');
  };

  // Delete a single item from list
  const deleteItem = (id) => {
    // Confirmation dialog box before deleting
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => setItems((prevItems) => 
            prevItems.filter((item) => item.id !== id)), 
          style: 'destructive'
        }
      ]
    );
  };

  // Reset list (clear)
  const clearList = () => {
    // Confirmation dialog box before deleting
    Alert.alert(
      'Clear All Items?',
      'This will remove everything from your list.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear',
          onPress: () => setItems([]),
          style: 'destructive'
        }
      ]
    );
  };

  // For displaying list items in checkbox 
  const toggleCheckbox = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.checkboxContainer]}>
      <CheckBox
        title={item.value}
        checked={item.completed}
        onPress={() => toggleCheckbox(item.id)}
        checkedColor='steelblue'
        textStyle={[item.completed ? styles.completedItem : styles.listItem]}
        containerStyle={[styles.checkboxContainer]}
      />
      <Text
        style={[styles.deleteButton]}
        onPress={() => deleteItem(item.id)}
      >
        ❌
      </Text>
    </View>
  );

  return (
    <View style={[styles.container]}>
      <View style={{flex:2, flexDirection:'column', alignItems:'left', padding:20 }}>
        <Text style={[styles.heading]}>MyTinerary</Text>

        {/* Typing and adding an item to list */}
        <Text style={[styles.subheading]}>ACTIVITY</Text>
        <View style={[styles.textInput]}>
          <TextInput
            placeholder='What would you like to experience?'
            onChangeText={handleTextChange}
            value={inputText}
          />
        </View>
        
        <Button
          title='+ Add item'
          onPress={handleSubmit}
          color='steelblue'
        />
      </View>

      {/* Displaying the list */}
      <View style={{flex:4, flexDirection:'column', padding:20, alignItems:'left'}}>
        <Text style={[styles.subheading]}>TO DO</Text>
        <FlatList style={{marginBottom:10}}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Button
          title='Clear List'
          onPress={clearList}
          color='crimson'
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
    paddingTop: 20,
    paddingBottom: 20,
  }, 
  subheading: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    backgroundColor: '#f6f6f6',
    marginTop: 5,
    marginBottom: 10,
    // inner text style
    paddingLeft: 10,
    paddingRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },
  completedItem: {
    fontSize: 16,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default MyTinerary;