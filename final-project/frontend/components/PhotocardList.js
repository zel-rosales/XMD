// frontend/components/PhotocardList.js
import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../StyleSheet';

export default function PhotocardList({ data, onPress }) {
  const renderItem = ({ item }) => {
  const tags = [];

  if (item.owned === 1 || item.owned === '1') {
    tags.push({ label: 'Owned', style: globalStyles.ownedTag });
  } else {
    tags.push({ label: 'ISO', style: globalStyles.isoTag });
  }

  if (item.wts === 1 || item.wts === '1') {
    tags.push({ label: 'WTS', style: globalStyles.wtsTag });
  }

  if (item.wtt === 1 || item.wtt === '1') {
    tags.push({ label: 'WTT', style: globalStyles.wttTag });
  }

  if (item.wtb === 1 || item.wtb === '1') {
    tags.push({ label: 'WTB', style: globalStyles.wtbTag });
  }

    return (
      <TouchableOpacity style={globalStyles.card} onPress={() => onPress(item)}>
        <View style={globalStyles.cardInner}>
          <View style={globalStyles.cardHeader}>
            <Text style={globalStyles.cardTitle}>{item.label}</Text>
          </View>
          <Text style={globalStyles.cardText}>{item.artist}</Text>
          <Text style={globalStyles.cardText}>{item.member}</Text>
          <Text style={globalStyles.cardText}>{item.album}</Text>

          <View style={globalStyles.tagContainer}>
            {tags.map((tag, index) => (
              <Text key={index} style={[globalStyles.tag, tag.style]}>
                {tag.label}
              </Text>
            ))}
            {(item.favorite === 1 || item.favorite === '1') && (
              <MaterialCommunityIcons
                name="heart"
                size={20}
                color="red"
                style={{ marginLeft: 4 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={globalStyles.cardList}
      renderItem={renderItem}
    />
  );

}
