/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const window = Dimensions.get('window')

var radio_props = [
  {label: 'Male', value: 0 },
  {label: 'Female', value: 1 }
];
const source = ''
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      gender: 'male',
      avatarSource: require('../Images/User_icon.png'),
      date: new Date(),
      changeDate: ''
      }
    }

  upload_image () {
     ImagePicker.showImagePicker(options, (response) => {
       console.log('Response = ', response);

       if (response.didCancel) {
         console.log('User cancelled image picker');
       }
       else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       }
       else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       }
       else {
         // You can display the image using either data...
         source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

         // or a reference to the platform specific asset location
         if (Platform.OS === 'ios') {
           source = {uri: response.uri.replace('file://', ''), isStatic: true};
           console.log('==========', source);
         } else {
           const source = {uri: response.uri, isStatic: true};
         }
         this.setState({
           avatarSource: source
         })
       }
     })
   }

   handleFocus (refName) {
      this.refs.scrollView.scrollTo({x: 0, y: 50.0 * 2, animated: true})
   }

   handleHidekeyboard (refName) {
      this.refs.scrollView.scrollTo({x: 0, y: 0.0 * 2, animated: true})
   }

   handleSubmitPress () {
     const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     if (this.state.name === '') {
       Alert.alert(
          'Message',
          'Please enter name',
          [
            {text: 'OK'}
          ]
        )
     } else if (this.state.email === '') {
       Alert.alert(
          'Message',
          'Please enter Email',
          [
            {text: 'OK'}
          ]
        )
     } else if (!emailPattern.test(this.state.email)) {
        Alert.alert(
          'Message',
          'Please enter valid email.',
          [
            {text: 'OK'}
          ]
        )
      }
       else {
        if (this.state.value === 0) {
          this.setState({gender: 'male'})
        } else {
          this.setState({gender: 'female'})
        }
        let Details = {
           name: this.state.name,
           email: this.state.email,
           phoneNumber: this.state.phoneNumber,
           date: this.state.changeDate,
           gender: this.state.gender,
           avatarSource: this.state.avatarSource
        }
        NavigationActions.Description(Details)
      }
    }

    focusNextField = (inputRef) => {
    if (inputRef === 'email') {
      this.refs.email.focus()
    } else if (inputRef === 'phone') {
      this.setState({isScrollUp: true})
      this.refs.phone.focus()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={{flex: 1, alignSelf: 'stretch', width: window.width}} source={require('../Images/mainBg.png')}>
          <ScrollView contentContainerStyle={styles.scrollContainer} ref='scrollView' scrollEnabled automaticallyAdjustContentInsets>
            <TouchableOpacity style={{backgroundColor: 'transparent', margin: 20,  width: 120, height: 120, alignItems: 'center', alignSelf: 'center'}}
              onPress={() => this.upload_image()}
              underlayColor='transparent'>
              <Image source={this.state.avatarSource} style={{flex: 1, width: 120, height: 120, borderRadius: 60}} />
            </TouchableOpacity>
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
              <View style={{ marginVertical: 10 }}>
                <View style={styles.fieldRow}>
                  <Image style={styles.emailIconStyle} source={require('../Images/blankUser.png')} />
                  <TextInput style={styles.textInputStyle}
                    placeholder='Name'
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    placeholderTextColor='grey'
                    returnKeyType='next'
                    ref='onfocus'
                    onChangeText={(name) => this.setState({name})}
                    onSubmitEditing={(event) => this.focusNextField('email')}
                  />
                </View>
                <View style={styles.inputBorder} />
              </View>
              <View style={{ marginVertical: 10 }}>
                <View style={styles.fieldRow}>
                  <Image style={styles.emailIconStyle} source={require('../Images/email_icon.png')} />
                  <TextInput style={styles.textInputStyle}
                    placeholder='Email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    underlineColorAndroid='transparent'
                    placeholderTextColor='grey'
                    returnKeyType='next'
                    ref='email'
                    onChangeText={(email) => this.setState({email})}
                    onSubmitEditing={(event) => this.focusNextField('phone')}
                  />
                </View>
                <View style={styles.inputBorder} />
              </View>
              <View style={{ marginVertical: 10 }}>
                <View style={styles.fieldRow}>
                  <Image style={styles.emailIconStyle} source={require('../Images/phone.png')} />
                  <TextInput style={styles.textInputStyle}
                    placeholder='Phone Number'
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    placeholderTextColor='grey'
                    returnKeyType='next'
                    ref='phone'
                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                    onFocus={() => this.handleFocus('onfocus')}
                    onSubmitEditing={() => this.handleHidekeyboard()}
                  />
                </View>
                <View style={styles.inputBorder} />
              </View>
              <View style={{ marginVertical: 5 }}>
                <DatePicker
                  style={{width: window.width / 2 + 150, height: 40, marginLeft: 5, marginBottom: 0, top: 0, backgroundColor: 'transparent'}}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="DD-MMM-YYYY"
                  minDate="01-01-1970"
                  maxDate="01-03-2017"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  backgroundColor='#649DD0'
                  color='#0E315C'
                  placeholderTextColor='grey'
                  onFocus={() => this.handleFocus('onfocus')}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      height: 30,
                      width: 30,
                      left: 0,
                      top: 5,
                      marginLeft: 0
                    },
                    dateInput: {
                      height: 50,
                      width: window.width,
                      alignItems: 'flex-start',
                      borderWidth: 0,
                      backgroundColor: 'transparent',
                      paddingLeft: 35,
                      marginLeft: 0
                    }
                  }}
                  onDateChange={(date) => {this.setState({date: date, changeDate: date})}}
                />
                <View style={styles.inputBorder} />
              </View>
              <View style={{backgroundColor: 'transparent', alignItems: 'center', top: 20}}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  buttonSize={15}
                  formHorizontal={true}
                  labelHorizontal={true}
                  labelStyle={{margin: 20, fontSize: 16, color: '#022044', fontFamily: 'Courier'}}
                  buttonColor={'#022044'}
                  animation={true}
                  onPress={(value) => {this.setState({value:value})}}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{backgroundColor: '#0E315C', justifyContent: 'center', alignItems: 'center', height: 60, marginBottom: 64}}>
            <TouchableOpacity underlayColor='grey' onPress={() => this.handleSubmitPress()}>
              <Text style={{color: 'white', fontSize: 20, fontFamily: 'Courier'}}> Submit </Text>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 64,
    backgroundColor: 'transparent',
  },
  textInputStyle: {
    backgroundColor: 'transparent',
    height: 40,
    fontSize: 16,
    fontFamily: 'Courier',
    width: window.width / 2 + 120,
    bottom: 0,
    marginLeft: 20,
    top: 0,
    color: '#0E315C'
  },
  fieldRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 40,
  },
  emailIconStyle: {
    width: 20,
    height: 20,
    left: 10,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  backgroundViewNew: {
    width: 60,
    height: 40,
    backgroundColor: 'transparent',
    top: 17,
    paddingLeft: 30
  },
  inputBorder: {
    width: window.width / 2 + 150,
    height: 1,
    marginLeft: 20,
    backgroundColor: '#FFFFFF90'
  },
  scrollContainer: {
    flex: 1,
    top: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
});

export default (Home)
