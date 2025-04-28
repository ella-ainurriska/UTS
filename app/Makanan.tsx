import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


export default function Makanan() {
  const [meals, setMeals] = useState([]);
 
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data => {
        console.log('DATA DARI THEMEALDB', data.meals);
        setMeals(data.meals || []);
      })
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedMeal(item)}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{item.strMeal}</Text>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
        <FlatList
          data={meals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  
});
