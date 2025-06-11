// frontend/components/PhotocardList.js
import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../StyleSheet';

export default function PhotocardList({ data, onPress }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={globalStyles.cardList}
      renderItem={({ item }) => (
        <TouchableOpacity style={globalStyles.card} onPress={() => onPress(item)}>
          <View style={globalStyles.cardInner}>
            <View style={globalStyles.cardHeader}>
              <Text style={globalStyles.cardTitle}>{item.label}</Text>
            </View>
            <Text style={globalStyles.cardText}>{item.artist}</Text>
            <Text style={globalStyles.cardText}>{item.member}</Text>
            <Text style={globalStyles.cardText}>{item.album}</Text>

            <View style={globalStyles.tagContainer}>
              <Text style={[globalStyles.tag, item.owned === 1 || item.owned === '1' ? globalStyles.ownedTag : globalStyles.isoTag]}>
                {item.owned === 1 || item.owned === '1' ? 'Owned' : 'ISO'}
              </Text>
              {(item.favorite === 1 || item.favorite === '1') && (
                <MaterialCommunityIcons name="heart" size={20} color="red" />
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
