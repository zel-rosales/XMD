import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';

const PhotoGallery = ({ refreshFlag }) => {
  const [photocards, setPhotocards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const parseCSV = (text) => {
  //   const lines = text.trim().split('\n');
  //   const headers = lines[0].split(',');
  //   const data = lines.slice(1).map(line => {
  //     const values = line.split(',');
  //     let obj = {};
  //     headers.forEach((header, i) => {
  //       // For numeric fields convert to numbers, others keep as string
  //       if (['id','favorite','sell','trade','buy'].includes(header)) {
  //         obj[header] = Number(values[i]);
  //       } else {
  //         obj[header] = values[i];
  //       }
  //     });
  //     return obj;
  //   });
  //   return data;
  // };

  // const fetchPhotocards = async () => {
  //   try {
  //     const response = await fetch('https://www.cs.drexel.edu/~gr539/BiasBinder-Final/backend/get_photocards.php?');
  //     const text = await response.text();
  //     const parsedData = parseCSV(text);
  //     setPhotocards(parsedData);
  //   } catch (error) {
  //     console.error("Error fetching photocards:", error);
  //   }
  // };

    const fetchPhotocards = async () => {
    try {
      const response = await fetch('https://www.cs.drexel.edu/~gr539/BiasBinder-Final/backend/get_photocards.php');
      const json = await response.json();
      if (json) {
        setPhotocards(json);
      } else {
        setError('No student data found.');
      }
    } catch (err) {
      setError('Fetch error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotocards();
  }, [refreshFlag]);

  return (
    <FlatList
      data={photocards}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      // {({ renderitem }) => (
      //   <View style={styles.card}>
      //     <Text>{item.label}</Text>
      //     <Text>{item.artist}</Text>
      //     <Text>{item.member}</Text>
      //     {item.image_url ? (
      //       <Image source={{ uri: item.image_url }} style={styles.image} />
      //     ) : (
      //       <Text>No image</Text>
      //     )}
      //     {/* other fields as needed */}
      //   </View>
      // )}
    />
  );
};

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text>{item.label}</Text>
      <Text>{item.artist}</Text>
      <Text>{item.member}</Text>
    </View>
    // <View style={styles.item}>
    //   <Text style={styles.name}>Name: {item.name}</Text>
    //   <Text>Age: {item.age}</Text>
    // </View>
  );

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default PhotoGallery;
