import {
  View,
  Text,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import API_URL from '../../utils/url';
import axios from 'axios';
import RadioGroup from 'react-native-radio-buttons-group';

export default function AddUser() {
  const [modalVisible, setModalVisible] = useState(false);

  const [users, setUsers] = useState([]);

  const [data, setData] = useState({});

  const [divRadioButtons, setDivRadioButtons] = useState([]);

  const [roleRadioButtons, setRoleRadioButtons] = useState([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Teacher',
      value: 'teacher',
    },
    {
      id: '2',
      label: 'Student',
      value: 'student',
    },
  ]);

  const handleChange = (key, value) => {
    console.log(key, value);
    setData(prevData => {
      return { ...prevData, [key]: value };
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`${API_URL}/getdivision`);
        if (response.data.status) {
          console.log(response.data.data);
          setDivRadioButtons(response.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`${API_URL}/getusers`);
        if (response.data.status) {
          console.log(response.data.data);
          setUsers(response.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      let response = await axios.post(`${API_URL}/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(response.data.status);
      if (response.data.status) {
        setUsers(prevData => {
          return [
            ...prevData,
            {
              name: data.name,
              email: data.email,
              role: data.role,
              division: data.division,
            },
          ];
        });
        setModalVisible(!modalVisible);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function onPressRadioButton(radioButtonsArray) {
    for (let i = 0; i < radioButtonsArray.length; i++) {
      if (radioButtonsArray[i].selected == true) {
        handleChange('division', radioButtonsArray[i].value);
        ToastAndroid.show(
          `Division ${radioButtonsArray[i].label} is selected`,
          ToastAndroid.SHORT,
        );
      }
    }
  }

  function onRoleChange(radioButtonsArray) {
    for (let i = 0; i < radioButtonsArray.length; i++) {
      if (radioButtonsArray[i].selected == true) {
        handleChange('role', radioButtonsArray[i].value);
      }
    }
  }

  return (
    <View>
      <ScrollView style={styles.sectionHeader}>
        {users.map((item, index) => {
          return (
            <View
              style={{ backgroundColor: 'white', borderRadius: 10, margin: 8 }}
              key={item.user_id}>
              <Text style={styles.item}>Name : {item.name}</Text>
              <Text style={styles.item}>Email : {item.email}</Text>
              {item.role != 'teacher' && (
                <Text style={styles.item}>Division : {item.division}</Text>
              )}
              <Text style={styles.item}>Role : {item.role}</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={e => {
                  handleChange('name', e);
                }}
                value={data.name}
                placeholder="Full Name"
              />
              <TextInput
                style={styles.input}
                onChangeText={e => {
                  handleChange('email', e);
                }}
                value={data.email}
                placeholder="Email"
              />

              <TextInput
                style={styles.input}
                onChangeText={e => {
                  handleChange('roll_number', e);
                }}
                value={data.roll_number}
                placeholder="Roll Number"
              />

              <Text style={{ fontSize: 20, margin: 4 }}>Select Division</Text>

              <RadioGroup
                layout="row"
                radioButtons={divRadioButtons.map((item, index) => {
                  return {
                    id: item.id,
                    label: item.division,
                    value: item.id,
                  };
                })}
                on
                onPress={onPressRadioButton}
              />

              <Text style={{ fontSize: 20, margin: 4 }}>Select Role</Text>

              <RadioGroup
                layout="row"
                radioButtons={roleRadioButtons}
                onPress={onRoleChange}
              />

              <TextInput
                style={styles.input}
                onChangeText={e => {
                  handleChange('password', e);
                }}
                value={data.password}
                placeholder="password"
              />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close Form</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.centerItem}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add User</Text>
          </TouchableOpacity>
        </View>
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

  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
    height: '90%',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});