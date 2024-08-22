import { ScrollView, Image, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../style/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsItem from '../components/newsItem';
import { db, getFirestore, collection, getDocs } from '../firebase/index';

const News = () => {
  const [NEWSLIST, SETNEWSLIST] = useState([]);

  const getNews = async () => {

    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firestore timestamp to JavaScript Date object if necessary
        if (data.date && data.date.toDate) {
          data.date = data.date.toDate().toLocaleString();
        }
        items.push({
          id: doc.id,
          ...data,
        });
      });
      console.log(items)
      SETNEWSLIST(items);
    } catch (error) {
      console.log("Error to load news: " + error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, padding: 20 }}>
      {/* FlatList */}
      { 
        NEWSLIST.length > 0 ? (
          <FlatList
            data={NEWSLIST}
            renderItem={({ item }) => 
            <NewsItem 
              content={item.content} 
              image={item.newsImage}
              date={item.date}
              />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <ActivityIndicator />
        )
      }
    </SafeAreaView>
  );
};

export default News;

const styles = StyleSheet.create({
  // Define your styles here if needed
});
