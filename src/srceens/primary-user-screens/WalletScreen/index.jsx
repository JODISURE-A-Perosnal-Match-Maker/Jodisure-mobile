import { Alert, FlatList, Linking, StatusBar, StyleSheet, View } from "react-native";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import React, { useState, useEffect, useContext } from "react";
import { FAB, Icon, ListItem } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import theme from "../../../theme/theme";
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_API_ID, RAZORPAY_API_SECRET } from 'react-native-dotenv'
const API_URL =
  "https://us-central1-rivayatt-3c9d5.cloudfunctions.net/createPaymentIntent";
import Theme from "../../../components/Theme";
import { UserContext } from "../../../navigation";
import { addPayment, createOrder, razorpayKeyId, razorpayKeySecret, updateProfile } from "../../../services/UserService";
import moment from "moment";
const amount= 210000

// const API_URL = 'http://localhost:5001/rivayatt-3c9d5/us-central1/createPaymentIntent';
const WalletScreen = () => {
  const userData = useContext(UserContext);
  const {
    initPaymentSheet,
    presentPaymentSheet,
    confirmPaymentSheetPayment,
  } = useStripe();
  const [loading, setLoading] = useState(false);
  const [pIntent, setPIntent] = useState(null);
  const [pKey, setPKey] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  

  const initializePaymentSheet = async () => {
    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();

      const res = await updateProfile({ customer_id: customer });

      const { error } = await initPaymentSheet({
        merchantDisplayName: "JodiSure",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        // allowsDelayedPaymentMethods: true,
      });
      console.log(error);
      if (!error) {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openPaymentSheet = async () => {
    console.log(pIntent, pKey);
    const { error } = await presentPaymentSheet();
    // console.log('Error at after payment:', error);
    // if (!error) {
    //   Alert.alert('Success', 'Your payment has been received');
    // }
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      console.log("hi now this can be determined if payment was successfull");
      // return confirmPaymentSheetPayment()
      //   .then(res => {
      //     console.log("Hurray--->",res);
      //     setIsPaid(true);
      //     Alert.alert('Success', 'Your order is confirmed!');
      //     return addPayment(pIntent, 1200, true, pKey);
      //   }).then(res => {
      //     console.log('payment added to users wallet');
      //   }).catch(error => {
      //     // Log any errors that occur in the chain
      //     console.log(error);
      //   })
      try {
        // const res = await confirmPaymentSheetPayment();
        // console.log("Confirmation result:", res);
        setIsPaid(true);
        Alert.alert("Success", "Your order is confirmed!");
        // console.log("REASON__>", reason);
        const paymentResult = await addPayment(pIntent, amount, true, "Wallet Recharge", pKey);
        console.log("Payment added to user's wallet:", paymentResult);
      } catch (confirmationError) {
        console.log("Error during payment confirmation:", confirmationError);
        // Handle any errors that occur during payment confirmation
      }
    }
    console.log("hi now this can be determined if payment was Done or not");
  };
  const handleChevronPress = (uid, orderId) => {
    const url = `https://asia-south1-rivayatt-3c9d5.cloudfunctions.net/getInvoice?uid=${uid}&oKey=${orderId}`;
    Linking.openURL(url)
      .catch(err => console.error("Failed to open URL:", err));
  };
  const handlePayment = async () => {
    // console.log("Can I use this???", JSON.stringify(userData));
    let razorpayKey = razorpayKeyId
    let razorpayKeySecret = razorpayKeySecret
    // console.log("ID--->", razorpayKeyId);

    const orderData = await createOrder("INR", amount)
    // console.log("Order info-->",orderData);
    var options = {
      description: 'Wallete Subscription',
      image: userData.profile.photo,
      currency: 'INR',
      key: razorpayKey,
      amount: amount,
      accept_partial:false,
      name: `${userData.profile.first_name} ${userData.profile.last_name}`,
      order_id: orderData.id,//Replace this with an order_id created using Orders API.
      prefill: {
        email: userData.profile.contact_email,
        contact: userData.profile.contact_no,
        name: userData.profile.contact_name
      },
      theme: { color: theme.colors.primary },
      method: {
        upi: true, // Enable UPI
        card: true,
        netbanking: true,
        wallet: true,
      }
    }

    

    RazorpayCheckout.open(options).then(async (data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);

      console.log("data--->", data, "orderdata--->", orderData)
      const paymentResult = await addPayment(orderData.id, amount/100, true, "Wallet Recharge", data.razorpay_payment_id, false);

    }).catch((error) => {
      // handle failure
      alert(`Error payment failed`, error);
    });
  }

  useEffect(() => {
    console.log(userData);
    try {
      initializePaymentSheet();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  useEffect(() => {
    const paymentHistorySubscriber = firestore()
      .collection("users")
      .doc(userData.uid)
      .collection("payments")
      .where("reason", "==", "Wallet Recharge")
      .orderBy("cratedAt", "desc")
      .onSnapshot(async (snapshots) => {
        const history = [];
        snapshots.forEach((doc) => {
          // if(!doc.data().createdAt)return false;
          history.push({ id: doc.id, ...doc.data() });
        });
        setPaymentHistory(history);
      });
    return paymentHistorySubscriber;
  }, []);

  return (
    <StripeProvider
      publishableKey={pKey}
    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <Theme.TextB color="white">Balance</Theme.TextB>
          <Theme.TextB size={46} color="white">
            {userData?.profile?.walletBalence || 0} pt.
          </Theme.TextB>
          {userData?.profile?.lastRecharged && (
            <Theme.Text color="#e4e4e4">
              Last recharged{" "}
              {moment(userData?.profile?.lastRecharged.toDate()).fromNow()}.
            </Theme.Text>
          )}
        </View>
        <View style={styles.paymentHistory}>
          <View style={{ marginVertical: 5 }}>
            <Theme.TextB>Payment History</Theme.TextB>
          </View>
          <FlatList
            data={paymentHistory}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ListItem bottomDivider>
                <Icon
                  name="credit-card"
                  type="evilicon"
                  color={theme.colors.primary}
                />
                <ListItem.Content>
                  {/* <ListItem.Content>
                    <Text>{JSON.stringify(item, null, 2)}</Text>
                  </ListItem.Content> */}
                  <ListItem.Title>{item.amount}</ListItem.Title>
                  {item.cratedAt && (
                    <ListItem.Subtitle>
                      Recharged {moment(item.cratedAt.toDate()).fromNow()}
                    </ListItem.Subtitle>
                  )}
                </ListItem.Content>
                <Icon
                  name="download"
                  type="feather" // Change the type to the icon library you are using
                  color={theme.colors.primary} // Customize the color
                  size={25}
                  // containerStyle={styles.chevron} // Apply custom styles
                  onPress={() => handleChevronPress(userData.uid, item.id)} // Handle press event
                />
              </ListItem>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View>
          {!isPaid && (
            <FAB
              icon={{
                name: "add",
                size: 25,
                color: theme.colors.white,
              }}
              color={theme.colors.primary}
              type="solid"
              placement="right"
              // disabled={!loading}
              // buttonStyle={styles.buttonStyle}
              // title="Add Money"
              onPress={handlePayment}
            />
          )}
        </View>
      </View>
    </StripeProvider>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    display: "flex",
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: StatusBar.currentHeight + 10,
  },
  chevron: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentHistory: {
    flex: 1,
  },
  balanceContainer: {
    height: 200,
    width: "100%",
    // backgroundColor: '#4C6AFF',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonStyle: {
    width: "100%",
  },
});
