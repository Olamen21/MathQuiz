import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import COLORS from '../style/Colors';

const NewsItem = ({ content, image, date }) => {
  

  console.log("Image URL:", image);

  console.log(date)

  return (
    <View style={styles.Container}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.img}
          onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
        />
      ) : (
        <Text style={{ color: COLORS.black }}>No picture</Text>
      )}
      <Text style={styles.Date}>{date}</Text>
      <Text style={styles.Content}>{content}</Text>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden', 
  },
  Date:{
    color: COLORS.gray,
    marginLeft: 5,
    padding: 2,
    top:5,
    left: 5,
    fontSize: 15
  },
  Content: {
    color: COLORS.black,
    padding: 10,
    fontSize: 18,
  },
  img: {
    height: 150,
    width: '100%',
  },
});
