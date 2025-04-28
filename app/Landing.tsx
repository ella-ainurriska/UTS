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

  