import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import _ from 'lodash';
import ImageLoad from 'react-native-image-placeholder';

const { width: windowWidth } = Dimensions.get('window');

const PhotoGrid = ({
  source,
  width = windowWidth,
  height = 500,
  postedBy,
  numberImagesToShow = 0,
  onPressImage = () => {},
  ratio = 1 / 3,
  imageProps = {},
  styles: customStyles = {},
  imageStyle = {},
  textStyles = {},
}) => {
  const [dimensions, setDimensions] = useState({ width:width, height:height });
  const [filteredSource, setFilteredSource] = useState([]);

  useEffect(() => {
    setFilteredSource(_.take(source, 5));
    // console.log("dimensionsaaa", dimensions);
  }, [source]);

  const isLastImage = (index, secondViewImages) => {
    return (source.length > 5 || numberImagesToShow) && index === secondViewImages.length - 1;
  };

  const handlePressImage = (event, { image, index }, secondViewImages) =>
    onPressImage(event, image, {
      isLastImage: index && isLastImage(index, secondViewImages),
    });

  const firstViewImages = [];
  const secondViewImages = [];
  const firstItemCount = filteredSource.length === 5 ? 2 : 1;

  filteredSource.forEach((img, index) => {
    if (index === 0) {
      firstViewImages.push(img);
    } else if (index === 1 && firstItemCount === 2) {
      firstViewImages.push(img);
    } else {
      secondViewImages.push(img);
    }
  });

  const direction = filteredSource.length === 5 ? 'row' : 'column';
  const firstImageWidth = direction === 'column' ? (dimensions.width / firstViewImages.length) : (dimensions.width * (1 - ratio));
  const firstImageHeight = filteredSource.length === 1 ? dimensions.height : (direction === 'column' ? (dimensions.height * (1 - ratio)) : (dimensions.height / firstViewImages.length));
  const secondImageWidth = direction === 'column' ? (dimensions.width / secondViewImages.length) : (dimensions.width * ratio);
  const secondImageHeight = direction === 'column' ? (dimensions.height / secondViewImages.length) : (dimensions.height * ratio);
  const secondViewWidth = direction === 'column' ? dimensions.width : (dimensions.width * ratio);
  const secondViewHeight = direction === 'column' ? (dimensions.height * ratio) : dimensions.height;

  return filteredSource.length ? (
    <View style={[{ flexDirection: direction, width: dimensions.width, height: dimensions.height }, customStyles]}>
      <View style={{ flex: 1, flexDirection: direction === 'row' ? 'column' : 'row' }}>
        {firstViewImages.map((image, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            style={{ flex: 1 }}
            onPress={(event) => handlePressImage(event, { image }, secondViewImages)}
          >
            <Text style={styles.photoCaption}>{postedBy} Posted</Text>
            <ImageLoad
              style={[styles.image, { width: firstImageWidth, height: firstImageHeight }, imageStyle]}
              source={typeof image === 'string' ? { uri: image } : image}
              {...imageProps}
            />
          </TouchableOpacity>
        ))}
      </View>
      {secondViewImages.length ? (
        <View style={{ width: secondViewWidth, height: secondViewHeight, flexDirection: direction === 'row' ? 'column' : 'row' }}>
          {secondViewImages.map((image, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={{ flex: 1 }}
              onPress={(event) => handlePressImage(event, { image, index }, secondViewImages)}
            >
              {isLastImage(index, secondViewImages) ? (
                <ImageBackground
                  style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, imageStyle]}
                  source={typeof image === 'string' ? { uri: image } : image}
                >
                  <View style={styles.lastWrapper}>
                    <Text style={[styles.textCount, textStyles]}>+{numberImagesToShow || source.length - 5}</Text>
                  </View>
                </ImageBackground>
              ) : (
                <ImageLoad
                  style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, imageStyle]}
                  source={typeof image === 'string' ? { uri: image } : image}
                  {...imageProps}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  ) : null;
};

PhotoGrid.propTypes = {
  source: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  postedBy: PropTypes.string,
  numberImagesToShow: PropTypes.number,
  onPressImage: PropTypes.func,
  ratio: PropTypes.number,
  imageProps: PropTypes.object,
  styles: PropTypes.object,
  imageStyle: PropTypes.object,
  textStyles: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  lastWrapper: {
    flex: 1,
    backgroundColor: 'rgba(200, 200, 200, .5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCount: {
    color: '#fff',
    fontSize: 60,
  },
  photoCaption: {
    top: 1,
    position: 'absolute',
    backgroundColor: '#bd6f9e',
    zIndex: 1,
    padding: 5,
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Barlow-Regular',
  },
});

export default PhotoGrid;
