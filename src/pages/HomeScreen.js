import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import cache from '../../utils/cache';
import {RNCamera} from 'react-native-camera';

export default function HomeScreen({navigation}) {
  const [url, setUrl] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    async function getData() {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      let tempRole = await cache.get('role');
      setRole(tempRole);
    }

    getData();
  }, []);

  const onSuccess = e => {
    console.log(e.data);
    if (isValidUrl(e.data)) {
      setIsScanned(true);
      setUrl(e.data);
    }
  };

  const handleWebView = () => {
    if (url === '' || !isScanned) {
      Alert.alert('Please scan a valid QR code');
      return;
    }

    navigation.navigate('PdfWebView', {
      url: url,
      setUrl: setUrl,
      setIsScanned: setIsScanned,
    });
  };

  const isValidUrl = urlString => {
    var urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const goToMasterData = () => {
    navigation.navigate('MasterData', {name: 'Master Data'});
  };

  const navToManualMaster = () => {
    navigation.navigate('ManualMaster', {name: 'Manual Master', role: role});
  };

  return (
    <View>
      <ScrollView>
        <QRCodeScanner
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.auto}
          reactivate={true}
          showMarker={true}
          reactivateTimeout={2000}
          cameraStyle={styles.cameraStyle}
          bottomContent={
            <Text numberOfLines={1} style={styles.centerText}>
              {isScanned && (
                <>
                  Go to <Text style={styles.textBold}>{url}</Text>
                </>
              )}
            </Text>
          }
        />
      </ScrollView>

      <View style={styles.centerItem}>
        <TouchableOpacity style={styles.button} onPress={handleWebView}>
          <Text style={styles.buttonText}>View Manual</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.centerItem}>
        <TouchableOpacity style={styles.button} onPress={handleWebView}>
          <Text style={styles.buttonText}>Show All Material</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.centerItem}>
        <TouchableOpacity style={styles.button} onPress={navToManualMaster}>
          <Text style={styles.buttonText}>Go to all Manuals</Text>
        </TouchableOpacity>
      </View>

      {role === 'teacher' && (
        <>
          <View style={styles.centerItem}>
            <TouchableOpacity style={styles.button} onPress={goToMasterData}>
              <Text style={styles.buttonText}>Master Data</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 0,
  },

  cameraStyle: {
    marginTop: 0,
    paddingTop: 0,
    height: 350,
  },

  cameraContainerStyle: {
    marginTop: 0,
    paddingTop: 0,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'white',
    // height: 100,
    width: 400,
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: 'white',
  },

  buttonTouchable: {
    padding: 16,
  },
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
});
