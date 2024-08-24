import React, { useEffect, useRef, useState, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import SleekBanner from '../../../components/SleekBanner'
import styled from 'styled-components/native';
import AntDesignIcom from 'react-native-vector-icons/AntDesign';
import { Searchbar } from 'react-native-paper';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import RecomendedProfile from '../../../components/Profile/RecommendedProfile';
import Theme from '../../../components/Theme';
import { getRecomendations } from '../../../services/UserService';
import theme from '../../../theme/theme';
import { Badge } from 'react-native-elements';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { searchById } from '../../../services/SUserService';
import { log } from 'console';

const primaryCol = '#05626e';
const lightGray = '#696969';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const AdviceTextContainer = styled.View`
  flex-direction:column;
  padding:10px;
  margin-left:15px;
  width:100%;
`;

const TitleText = styled.Text`
  font-family:Barlow-SemiBold;
  font-size:${props => (props.size) ? props.size : '16px'};
  color:${props => (props.color) ? props.color : primaryCol};
`;
const UList = styled.View`
  flex-direction:row;
  align-items:center;
`;
const Bullet = styled.Text`
  font-size:20px;
  font-weight:bold;
  margin-right:5px;
  color:${primaryCol};
`;
const BulletText = styled.Text`
  color:${lightGray};
`;

const Section = styled.View`
  margin-bottom:10px;
  border-bottom-color:#456;
`;


const Devider = styled.View`
  height:8px;
  background-color:#e8e8e8;
`;

const RecommendationsScreen = () => {
  const isFocused = useIsFocused();
  const [profiles, setProfiles] = useState([]);
  const [fullProfiles, setFullProfiles] = useState([])
  const [fetched, setFetched] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    if (isFocused) {
      refresh
        ();
    }
  }, [isFocused]);

  useEffect(() => {
    // Set initial scroll position to the start
    if (profiles.length > 0) {
    ref.current?.scrollToIndex({ index: 0, animated: false });
    }
  }, [profiles]);



  const refresh = useCallback(() => {
    console.log("u");
    setLoading(true);
    getRecomendations().then(async rx => {
      // console.log("before shuffle", JSON.stringify(rx, null, 2));
      if (Array.isArray(rx)) {
        // await shuffleArray(rx);
        // console.log("after shuffle", JSON.stringify(rx, null, 2));

        setProfiles(rx);
        setFullProfiles(rx);
      } else {
        // If rx is not an array, handle it appropriately, e.g., log an error or set an empty array
        console.error("Received data is not an array");
        setProfiles([]);
        setFullProfiles([]);
      }
    }).catch(err => {
      console.log(err);
      alert("You haven't set your preference yet!! Please set your preferences first.")
    }).finally(() => {
      setLoading(false);
      setFetched(true);
      navigation.navigate('MyPreferences')
    })
    console.log('i just enter recomendation connection', profiles);
  })

  const prevBtnPresHandler = () => {
    if (scrollIndex === 0) {
      return;
    } else {
      ref.current?.scrollToIndex({
        index: scrollIndex - 1,
        animated: true
      });
    }
  }
  useEffect(() => {
    if (searchQuery.length === 0) {
      setProfiles(fullProfiles)
      setFetched(true)

      return
    }
  }, [searchQuery])

  const searchPorfileID = async () => {
    const uppercaseQuery = searchQuery.toUpperCase().trim(); // Convert to uppercase and trim whitespace
    console.log("hi there", uppercaseQuery);
    if (searchQuery.length === 0) {
      setProfiles(fullProfiles)
      setFetched(true)

      return
    } else {

      const filteredProfiles = profiles.filter((profile) => profile.UUID === uppercaseQuery);
      console.log("Filtered Profile", filteredProfiles);

      if (filteredProfiles.length == 0) {
        alert("No User found based on this ID")

      }
      setProfiles(filteredProfiles)
      setFetched(true)
    }

    // searchById(searchQuery).then(rx => {
    //   // console.log("rxx-->", rx)
    //   if (rx.length == 0) {
    //     alert("No User found based on this ID")
    //   }
    //   setProfiles(rx);
    //   setFetched(true)
    // }).catch(err => {
    //   console.log(err);
    //   alert("No User found based on this ID")
    // }).finally(() => {
    //   setLoading(false);
    //   setFetched(true);

    // })
  }

  const nextBtnPresHandler = () => {
    if (scrollIndex === profiles.length - 1) {
      return;
    } else {
      ref.current?.scrollToIndex({
        index: scrollIndex + 1,
        animated: true
      });
    }
  }

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;

    const index = Math.round(contentOffsetX / slideSize);
    setScrollIndex(index);

    // Check if the user has reached the end of the list
    if (contentOffsetX >= contentWidth - slideSize) {
      ref.current.scrollToIndex({
        index: 0,
        animated: false
      });
    }
  }, []);



  /** Co-pilot */
  const { canStart, start, stop, eventEmitter } = useTourGuideController();

  useEffect(() => {
    if (canStart & fetched && profiles.length) {
      start();
    }
  }, [canStart])

  const handleOnStart = () => console.log('start');
  const handleOnStop = () => console.log('stop');
  const handleOnStepChange = () => console.log(`stepChange`);
  useEffect(() => {
    eventEmitter.on('start', handleOnStart)
    eventEmitter.on('stop', handleOnStop)
    eventEmitter.on('stepChange', handleOnStepChange)

    return () => {
      eventEmitter.off('start', handleOnStart)
      eventEmitter.off('stop', handleOnStop)
      eventEmitter.off('stepChange', handleOnStepChange)
    }
  }, []);

  /**End of Co-pilot */

  const renderItem = useCallback(({ item }) => (
    <View style={{ width: width }}>
      {/* <Text style={{color:"black"}}>{item.id}</Text> */}
      <RecomendedProfile uid={item.id} refresh={refresh} profile={item} />
    </View>
  ), []);

  const memoizedRenderItem = useCallback(({ item }) => renderItem({ item }), [renderItem]);

  // Debugging function to check layout
  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    console.log('FlatList Layout:', { width, height });
  };

  const profileListScroller = (
    <View>
      <FlatList
        ref={ref}
        initialScrollIndex={scrollIndex}
        style={styles.list}
        data={profiles}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        windowSize={5} // Number of items to keep in memory
        maxToRenderPerBatch={10} // Number of items to render in each batch
        initialNumToRender={10} // Number of items to render initially
        horizontal

        pagingEnabled={true}
        bounces={false}
        onScroll={onScroll}
        renderItem={memoizedRenderItem}
        updateCellsBatchingPeriod={50} // Interval to update cells batching
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onLayout={handleLayout} // Debug layout
      />
      <View style={styles.pnbtnContainer}>

        <TouchableOpacity onPress={prevBtnPresHandler}>
          <View style={{ ...styles.prevBtn, display: scrollIndex === 0 ? 'none' : 'flex' }}>
            <AntDesignIcom name='left' size={34} color={theme.colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextBtnPresHandler}>
          <View style={{ ...styles.nextBtn, display: scrollIndex === profiles.length - 1 ? 'none' : 'flex' }}>
            {/* <TourGuideZone
              shape='circle'
              zone={1}
              text={'Swipe right or left to navigate'}
              borderRadius={16}
            >
              <AntDesignIcom name='right' size={34} color={theme.colors.white} />
            </TourGuideZone> */}
            <AntDesignIcom name='right' size={34} color={theme.colors.white} />
          </View>

        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
    >
      {loading ? <FullScreenLoader /> : null}

      <View style={styles.container}>
        {/* <SleekBanner image={require('../../../assets/images/pair.png')} content="Let’s get started by connecting some of the profile that we recommend you" /> */}
        <Searchbar
          placeholder="Enter Profile ID"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onIconPress={searchPorfileID}

        />
        <View style={{ width: '100%' }}>
          <View style={{ marginVertical: 12, marginLeft: 12 }}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => start()}>

              <Theme.TextB>Recommendations </Theme.TextB>
              {/* <Badge status='primary' value={profiles.length} /> */}
            </TouchableOpacity>
          </View>
          {/* {(fetched) && profiles.length && <View>
            <TourGuideZone
              zone={1}
              text={'Swipe to view next and previous profile!!'}
              borderRadius={16}
            >
            </TourGuideZone>
          </View>} */}
          {
            // profiles.map(p => (
            //   <View key={p}>
            //     <RecomendedProfile uid={p} refresh={refresh} />
            //     <Devider />
            //   </View>
            // ))
          }
          {/* {(fetched && profiles.length) && profileListScroller} */}
          {(fetched) && profileListScroller}

          {(fetched && !profiles.length) ? (
            <View>
              <View style={{ padding: 25, marginTop: 25, backgroundColor: theme.colors.primary }}>
                <Theme.TextB color="white" style={{ textAlign: 'center' }}>No recommendations for you as of now!!</Theme.TextB>
              </View>
            </View>
          ) : null}

        </View>
      </View>
    </ScrollView>
  )
}

export default RecommendationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  pnbtnContainer: {
    position: 'absolute',
    top: height / 2 - 50,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  prevBtn: {
    position: 'relative',
    left: -10,
    backgroundColor: theme.colors.primary + '80',
    height: 50,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,

    elevation: 1,
  },
  nextBtn: {
    position: 'relative',
    right: -10,
    backgroundColor: theme.colors.primary + '80',
    height: 50,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,

    elevation: 1,
  }
});
