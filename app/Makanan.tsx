import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome untuk ikon

export default function Makanan() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState<any>(null); // Menyimpan makanan yang dipilih

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

  const handleBackToList = () => {
    setSelectedMeal(null); // Kembali ke daftar makanan
  };

  return (
    <View style={styles.container}>
      {selectedMeal ? ( // Jika ada makanan yang dipilih, tampilkan resep
        <>
          <View style={styles.resepContainer}>
            <Text style={styles.resepTitle}>{selectedMeal.strMeal}</Text>
            <Image source={{ uri: selectedMeal.strMealThumb }} style={styles.resepImage} />
            <ScrollView style={{ maxHeight: 200, marginTop: 10 }}>
              <Text style={styles.resepText}>{selectedMeal.strInstructions}</Text>
            </ScrollView>

            {/* Tombol kembali dengan panah kiri */}
            <TouchableOpacity style={styles.backButton} onPress={handleBackToList}>
              <Icon name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  resepContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  resepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  resepImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  resepText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    bottom: 0,  
    left: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 40,
    padding: 10,
    elevation: 1,
    marginBottom: 0,
  },
});
