import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import API_URL from '../../utils/url';
import CheckBox from '@react-native-community/checkbox';

export default function ManualMaster({navigation, route}) {
  const {role} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [manual, setManual] = useState([]);
  const [divisions, setDivision] = useState([]);

  const [divArr, setDivArr] = useState({});

  const [data, setData] = useState({});

  const handleChange = (key, value) => {
    console.log(key, value);

    setData(prevData => {
      return {...prevData, [key]: value};
    });
  };

  const handleDivChange = (key, value) => {
    let temp = divArr;

    setDivArr(prevData => {
      return {...prevData, [key]: value};
    });

    temp = {...temp, [key]: value};

    handleChange('division', temp);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`${API_URL}/getdivision`);
        if (response.data.status) {
          console.log(response.data.data);
          setDivision(response.data.data);
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
        let response = await axios.get(`${API_URL}/getmanual`);
        if (response.data.status) {
          console.log(response.data.data);
          setManual(response.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  const navToWevView = url => {
    navigation.navigate('PdfWebView', {url: url});
  };

  const handleSubmit = async () => {
    try {
      let response = await axios.post(`${API_URL}/addmanual`, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.data.status) {
        setManual(prevData => {
          return [
            ...prevData,
            {machine_name: data.machine_name, drive_link: data.drive_link},
          ];
        });
        setModalVisible(!modalVisible);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <ScrollView style={styles.sectionHeader}>
        {manual.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => navToWevView(item.drive_link)}
              style={{backgroundColor: 'white', borderRadius: 10, margin: 8}}
              key={item.key}>
              <Text style={styles.item}>{item.machine_name}</Text>
              <Text numberOfLines={1} style={styles.link}>
                {item.drive_link}
              </Text>
            </TouchableOpacity>
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
                  handleChange('machine_name', e);
                }}
                value={data.machine_name}
                placeholder="Manual Name"
              />
              <TextInput
                style={styles.input}
                onChangeText={e => {
                  handleChange('drive_link', e);
                }}
                value={data.drive_link}
                placeholder="Drive Link"
              />

              <Text style={{fontSize: 18}}>Select Division</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 10,
                  flexWrap: 'wrap',
                }}>
                {divisions.map((item, index) => {
                  return (
                    <>
                      <CheckBox
                        value={divArr[item.id]}
                        onValueChange={e => {
                          handleDivChange(item.id, e);
                        }}
                      />
                      <Text style={{fontSize: 18, marginLeft: 10}}>
                        {item.division}
                      </Text>
                    </>
                  );
                })}
              </View>

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

        {role === 'teacher' && (
          <View style={styles.centerItem}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Add Manual</Text>
            </TouchableOpacity>
          </View>
        )}
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

  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
