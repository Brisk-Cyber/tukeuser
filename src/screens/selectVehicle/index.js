import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import VehicleSelection from '../../components/VehicleSelection';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import CommonBtn from '../../components/CommonBtn';
import {images} from '../../constants';
import {OrderContext} from '../../utils/context';
import axios from 'axios';
import {loader} from '../../redux/actions/loader';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const SelectVehicle = props => {
  const [orderData, setOrderData] = useContext(OrderContext);
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    dispatch(loader(true));
    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/OrderDetails/AddOrder',
        {
          user_MobileNo: '9754944101',
          pickup_Date: orderData.pickup_Date,
          pickup_Time: '11:00am',
          pick_Location: orderData.pick_Location,
          pick_Address: orderData.pick_Address,
          pick_Late: '22',
          pick_City: orderData.pick_City,
          destination_Location: orderData.destination_Location,
          destination_Address: orderData.destination_Address,
          destination_Late: 'string',
          destiNation_City: orderData.destiNation_City,
          reciver_Name: orderData.reciver_Name,
          reciver_MobileNo: orderData.reciver_MobileNo,
          vehicle_ID: orderData.vehicle_ID,
          estimated_Cost: orderData.estimated_Cost.toString(),
          pick_Long: 'string',
          destination_Long: 'string',
          distance: orderData.distance,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(function (response) {
        console.log(';;;;;response====>>>--', response.data);
        if (response.status == 200) {
          if (response.data.status == 'Success') {
            dispatch(loader(false));
            console.log(response.data.message);
            props.navigation.navigate('Payment');
          } else {
            dispatch(loader(false));
          }
        } else {
          dispatch(loader(false));
        }
      })
      .catch(function (error) {
        console.log('error: ', error);
        dispatch(loader(false));
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        onPress={() => props.navigation.goBack()}
        text="Select vehicle"
        showLine={true}
      />
      <ScrollView>
        <VehicleSelection

        // vehicleContianer={{opacity: isIMageOpacity ? 0.5 : 1}}
        // opacityCallback={handlerOpacity}
        />
        <View
          style={[
            styles.horizontalLine,
            {marginTop: h(1), borderBottomWidth: w(1)},
          ]}
        />
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Ionicons name="ios-location-outline" size={22} color="green" />
            <View style={styles.verticleLine} />
            <Image source={images.flag_image} style={{marginLeft: w(3)}} />
          </View>
          <View style={styles.locationArea}>
            <TouchableOpacity style={styles.horizontal}>
              <Text style={styles.placeName}>{orderData.pick_City}</Text>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
            <View style={[styles.horizontalLine, {marginVertical: h(2)}]} />
            <TouchableOpacity style={styles.horizontal}>
              <Text style={styles.placeName}>
                {orderData.destination_Address}
              </Text>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.horizontalLine,
            {marginTop: h(1), borderBottomWidth: w(3)},
          ]}
        />
        <View style={styles.horizontalBox}>
          <Text style={{marginLeft: w(4)}}>08066845214</Text>
          <View style={styles.textWithIcon}>
            <Text style={{fontSize: fs(10)}}>Select from contact</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={30} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.horizontalLine]} />
        <View style={styles.horizontalBox}>
          <View style={styles.textWithIcon}>
            <AntDesign name="user" size={25} />
            <TextInput
              maxLength={10}
              placeholder={`Reciever's Number`}
              placeholderTextColor="lightgrey"
              style={{paddingLeft: 12}}
              // orderData, setOrderData
              onChangeText={val => {
                setOrderData({...orderData, reciver_MobileNo: val});
              }}
              value={orderData.reciver_MobileNo}
            />
          </View>
          <View style={styles.textWithIcon}>
            <Text style={{fontSize: fs(10)}}>Select from contact</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={30} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.horizontalLine]} />
        <View style={styles.NameInput}>
          <AntDesign name="user" size={25} />
          <TextInput
            maxLength={15}
            placeholder="Name"
            placeholderTextColor={'lightgrey'}
            style={{paddingLeft: 12}}
            onChangeText={val => {
              setOrderData({...orderData, reciver_Name: val});
            }}
            value={orderData.reciver_Name}
          />
        </View>
        <View style={[styles.horizontalLine, {borderBottomWidth: h(2)}]} />
        <View style={styles.horizontalBox}>
          <Text style={{marginLeft: w(4)}}>Pick up time</Text>
          <View style={styles.textWithIcon}>
            <Text style={styles.footerText}>Now</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.horizontalLine]} />
        <View style={styles.horizontalBox}>
          <Text style={{marginLeft: w(4)}}>Payment method</Text>
          <View style={styles.textWithIcon}>
            <Text style={styles.footerText}>Wallet</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.horizontalLine]} />
        <View style={styles.numberBox}>
          <Text style={{}}>Estimated cost</Text>
          <Text style={styles.number}> N4,000</Text>
        </View>
        <View style={styles.confirmBtnView}>
          <CommonBtn
            text="Confirm"
            customBtnStyle={styles.confirmBtn}
            onPress={onSubmitHandler}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectVehicle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  placeName: {
    fontSize: fs(18),
    fontWeight: 'bold',
    width:w(75)
  },
  verticleLine: {
    height: h(6),
    width: 1,
    backgroundColor: 'black',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: w(2),
    marginTop: h(3),
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: w(5),
  },
  imageView: {
    width: 200,
    height: 100,
  },
  confirmBtn: {
    borderRadius: 0,
    width: w(100),
    height: h(8),
  },
  number: {
    fontSize: fs(26),
    color: 'black',
    fontWeight: '100',
  },
  numberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: h(1),
  },
  horizontalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: w(3),
  },
  confirmBtnView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerText: {
    fontSize: fs(17),
    color: 'black',
    fontWeight: 'bold',
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  NameInput: {
    flexDirection: 'row',
    padding: w(3),
    alignItems: 'center',
  },
  locationArea: {
    flex: 1,
    marginLeft: w(1),
  },
});
