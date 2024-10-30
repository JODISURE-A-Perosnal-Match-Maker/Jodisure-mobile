import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import RecomendedProfile from '../../../components/Profile/RecommendedProfile';
import Theme from '../../../components/Theme';
import { getRecomendations } from '../../../services/UserService';
import theme from '../../../theme/theme';
import FullScreenLoader from '../../../theme/FullScreenLoader';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const RecommendationsScreen = () => {
  const isFocused = useIsFocused();
  const [profiles, setProfiles] = useState([]);
  const [visibleProfiles, setVisibleProfiles] = useState([]); // Holds visible profiles
  const [chunkSize] = useState(20); // Define how many profiles to load at a time
  const [fullProfiles, setFullProfiles] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [searchQuery, setSearchQuery] = useState('');

  // Load the initial data when screen is focused
  useEffect(() => {
    if (isFocused) {
      refresh();
    }
  }, [isFocused]);

  // Initially load the first chunk of profiles when the data is fetched
  useEffect(() => {
    if (fullProfiles.length > 0) {
      setVisibleProfiles(fullProfiles.slice(0, chunkSize)); // Load initial chunk
    }
  }, [fullProfiles]);

  // Refresh function to get the recommendations and reset states
  const refresh = useCallback(() => {
    setLoading(true);
    getRecomendations().then((rx) => {
      if (Array.isArray(rx)) {
        setFullProfiles(rx); // Store the full array of profiles
      } else {
        console.error('Received data is not an array');
        setFullProfiles([]);
      }
    }).catch(err => {
      console.log(err);
      alert("You haven't set your preference yet! Please set your preferences first.");
    }).finally(() => {
      setLoading(false);
      setFetched(true);
    });
  }, []);

  // Infinite scroll to load more profiles
  const onEndReached = () => {
    if (visibleProfiles.length < fullProfiles.length) {
      const newVisibleProfiles = fullProfiles.slice(visibleProfiles.length, visibleProfiles.length + chunkSize);
      setVisibleProfiles([...visibleProfiles, ...newVisibleProfiles]);
    }
  };

  // Search functionality by Profile ID
  const searchPorfileID = async () => {
    const uppercaseQuery = searchQuery.toUpperCase().trim();
    if (searchQuery.length === 0) {
      setVisibleProfiles(fullProfiles.slice(0, chunkSize));
      setFetched(true);
    } else {
      const filteredProfiles = fullProfiles.filter((profile) => profile.UUID === uppercaseQuery);
      if (filteredProfiles.length === 0) {
        alert("No User found based on this ID");
      }
      setVisibleProfiles(filteredProfiles);
      setFetched(true);
    }
  };

  // Handling scroll to load more profiles
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / slideSize);
    setScrollIndex(index);

    // Automatically load more profiles when reaching halfway
    if (index === Math.floor(visibleProfiles.length / 2)) {
      onEndReached();
    }
  }, [visibleProfiles]);

  // Render each profile
  const renderItem = useCallback(({ item }) => (
    <View style={{ width: width }}>
      <RecomendedProfile uid={item.id} refresh={refresh} profile={item} />
    </View>
  ), []);

  const memoizedRenderItem = useCallback(({ item }) => renderItem({ item }), [renderItem]);

  const profileListScroller = (
    <View style={{ height: height }}>
      <FlatList
        ref={ref}
        initialScrollIndex={scrollIndex}
        style={styles.list}
        data={visibleProfiles}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        windowSize={5} // Number of items to keep in memory
        maxToRenderPerBatch={20} // Number of items to render in each batch
        initialNumToRender={20} // Number of items to render initially
        horizontal
        onEndReached={onEndReached} // Load more items when reaching the end
        onEndReachedThreshold={0.5}
        pagingEnabled={true}
        bounces={false}
        onScroll={onScroll}
        renderItem={memoizedRenderItem}
        updateCellsBatchingPeriod={50} // Interval to update cells batching
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </View>
  );

  return (
    <>
      {loading ? <FullScreenLoader /> : null}

      <View style={styles.container}>
        
        <Searchbar
          placeholder="Enter Profile ID"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onIconPress={searchPorfileID}
        />
        <View style={{ width: '100%' }}>
          <View style={{ marginVertical: 12, marginLeft: 12 }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Theme.TextB>Recommendations </Theme.TextB>
            </TouchableOpacity>
          </View>
          {fetched && profileListScroller}
          {fetched && !profiles.length ? (
            <View>
              <View style={{ padding: 25, marginTop: 25, backgroundColor: theme.colors.primary }}>
                <Theme.TextB color="white" style={{ textAlign: 'center' }}>No recommendations for you as of now!!</Theme.TextB>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default RecommendationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: 50,
  },
});
