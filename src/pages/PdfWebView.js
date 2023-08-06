import {View, Text, BackHandler, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';

export default function PdfWebView(props) {
  const {url, setUrl, setIsScanned} = props.route.params;

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            try {
              setUrl('');
              setIsScanned(false);
              props.navigation.goBack();
            } catch (e) {
              console.log(e);
              props.navigation.goBack();
            }
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <WebView
      source={{
        uri: url,
      }}
      style={{marginTop: 20}}
    />
  );
}
