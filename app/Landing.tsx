import React, { useEffect, useRef } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Color from '../services/Colors'
import { useRouter } from 'expo-router'

const { width } = Dimensions.get('window')

const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5)

export default function Landing() {
  const router = useRouter(); // ✅ disini tempat yang benar!

  const scrollRefs = [useRef(null), useRef(null), useRef(null)]

  const originalImageList = [
    require('./../assets/images/gambar/7.jpg'),
    require('./../assets/images/gambar/6.jpg'),
    require('./../assets/images/gambar/2.jpg'),
    require('./../assets/images/gambar/3.jpg'),
    require('./../assets/images/gambar/1.jpg'),
    require('./../assets/images/gambar/4.jpg'),
    require('./../assets/images/gambar/5.jpg'),
  ]

  const imageRows = [
    shuffle(originalImageList),
    shuffle(originalImageList),
    shuffle(originalImageList),
  ]

  useEffect(() => {
    const totalWidth = originalImageList.length * 130
    const positions = [0, 0, 0]

    const intervals = scrollRefs.map((ref, i) =>
      setInterval(() => {
        positions[i] += 1
        if (positions[i] > totalWidth - width) {
          positions[i] = 0
        }
        scrollRefs[i]?.current?.scrollTo({ x: positions[i], animated: false })
      }, 20 + i * 10)
    )

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <View style={styles.container}>
      {imageRows.map((images, rowIndex) => (
        <ScrollView
          key={rowIndex}
          horizontal
          ref={scrollRefs[rowIndex]}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 5,
          }}
        >
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </ScrollView>
      ))}
      <View style={{
        backgroundColor: Color.WHITE,
        height: '50%',
        padding: 20
      }}>
        <Text style={{
          fontSize: 25,
          textAlign: 'center',
        }}>
          Resep Makanan 🥗 | Temukan, Buat & Nikmati Resep Lezat!
        </Text>
        <Text style={{
          textAlign: 'center',
          fontSize: 17,
          color: Color.GRAY,
          marginTop: 7
        }}>
          Generate delicious recipes in second with the power of AI
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/login')}
          style={styles.button}>
          <Text style={{
            textAlign: 'center',
            color: Color.WHITE,
            fontSize: 15
          }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  row: {
    marginVertical: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    gap: 15
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 25
  },
  button: {
    backgroundColor: Color.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 15
  }
})
