import React, { useEffect, useRef } from 'react'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')

// Fungsi shuffle agar gambar tidak sama antar baris
const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5)

export default function Landing() {
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

  // Buat tiga baris gambar yang sudah diacak
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
      }, 20 + i * 10) // kecepatan beda dikit biar keren
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
            <View>

            </View>
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </ScrollView>
      ))}
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
})
