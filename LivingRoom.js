import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ref, db, onValue } from './firebase';
import { useNavigation } from '@react-navigation/native';

const LivingRoom = () => {
  const navigation = useNavigation();

  const [suhu, setSuhu] = useState(60);
  const [kelembaban, setKelembaban] = useState(30);

  useEffect(() => {
    const data = ref(db);

  onValue(data, (snapshot) => {
    setSuhu(Math.round(snapshot.val()?.suhu || 0));
    setKelembaban(Math.round(snapshot.val()?.kelembaban || 0));
  });
  }, [db]);

  const navigateToHistory = () => {
    navigation.navigate('HistoryScreen', {
      suhu,
      kelembapan,
    });
  };

  return (
    <View style={styles.container}>
      {/* Kotak Kelembaban */}
      <View style={styles.box}>
        <Icon name="water" size={50} color="white" />
        <Text style={styles.title}>Kelembaban Ruangan</Text>
        <Text style={styles.subtitle}>Kelembapan: {kelembaban}%</Text>
      </View>
      {/* Kotak Suhu */}
      <View style={styles.box}>
        <Icon name="thermometer" size={50} color="white" />
        <Text style={styles.title}>Suhu Ruangan</Text>
        <Text style={styles.subtitle}>Temperature: {suhu}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    flex: 1,
    backgroundColor: '#71C490',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    margin: 4,
    marginTop: -500,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#457B9D',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LivingRoom;
