import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export default function MasterData({navigation}) {
  const navToDivision = () => {
    navigation.navigate('Division');
  };

  const navToAddUser = () => {
    navigation.navigate('AddUser');
  };

  return (
    <View>
      <View style={styles.centerItem}>
        <TouchableOpacity style={styles.button} onPress={navToAddUser}>
          <Text style={styles.buttonText}>Add User </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerItem}>
        <TouchableOpacity style={styles.button} onPress={navToDivision}>
          <Text style={styles.buttonText}>Add Division</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ff6900',
    borderRadius: 40,
    width: 250,
    height: 45,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  centerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
