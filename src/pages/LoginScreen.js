import {
  View,Text,StyleSheet,Image,SafeAreaView,TextInput,TouchableOpacity,} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../utils/url';
import cache from '../../utils/cache';
import RadioGroup from 'react-native-radio-buttons-group';

export default function LoginScreen({ navigation }) {
  let icon = require('../res/images/login.png');
  const [data, setData] = React.useState({});
  const handleData = (key, value) => {
    setData(prevData => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  
  const [radioButtons, setRadioButtons] = useState([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Teacher',
        value: 'option1'
    },
    {
        id: '2',
        label: 'Student',
        value: 'option2'
    }
]);
function onPressRadioButton(radioButtonsArray) {
  setRadioButtons(radioButtonsArray);
}
  const handleSumit = async () => {
    try {
      let response = await axios.post(`${API_URL}/signin`, data);

      if (response.data.status) {
        navigation.navigate('HomeScreen', { name: 'Home' });
        await cache.set('user_id', response.data.data.user_id);
        await cache.set('email', response.data.data.email);
        await cache.set('role', response.data.data.role);
      }
    } catch (error) {
      console.log(error);
    }
  };
return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <Image source={icon} style={styles.topImage} />
      </View>

      <View style={styles.bottomView}>
        <SafeAreaView>
          <Text style={styles.header}>Login</Text>
          <Text numberOfLines={5} style={styles.text}>
            Please sign in to continue
          </Text>
          <RadioGroup 
          layout={'row'}
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />

          <View style={styles.inputView}>
            <TextInput
              inlineImageLeft="userIcon.png"
              placeholder="email"
              style={styles.input}
              onChangeText={e => handleData('email', e)}
              value={data.email}
            />

            <TextInput
              secureTextEntry={true}
              placeholder="password"
              style={styles.input}
              onChangeText={e => handleData('password', e)}
              value={data.password}
            />
          </View>
          <View style={styles.centerItem}>
            <TouchableOpacity style={styles.button} onPress={handleSumit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 15, marginTop: 5, borderBottomWidth: 0 }}>
              Forgot Password
            </Text>
          </View>
        </SafeAreaView>
        <Image source={icon} style={styles.bottomImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  topView: {
    flex: 1,
  },
  topImage: {
    marginTop: -350,
    marginStart: 200,
    transform: [{ rotate: '40deg' }],
  },
  bottomImage: {
    marginStart: -360,
    marginTop: 10,
    transform: [{ rotate: '-10deg' }],
  },
  bottomView: {
    flex: 2,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  text: {
    fontSize: 17,
    marginLeft: 10,
    lineHeight: 40,
  },
  inputView: {
    marginTop: 20,
  },
  input: {
    height: 50,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#7895B2',
    color: '#000',
    fontSize: 20,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff6900',
    borderRadius: 40,
    width: 150,
    height: 45,
    padding: 10,
  },
  centerItem: {
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
