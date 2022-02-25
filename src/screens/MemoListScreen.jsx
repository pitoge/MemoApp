import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    // ユーザーのログイン状態が切れている場合
    // currentUser が空になりエラーが発生するため、
    // 対策として存在する場合のみ読み込む
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/memos`)
        .orderBy('updatedAt', 'desc');
      unsubscribe = ref.onSnapshot(
        (snapShot) => {
          const userMemos = [];
          snapShot.forEach((doc) => {
            console.log(doc.id, doc.data());
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
        },
        (error) => {
          console.log(error);
          Alert.alert('データの読み込みに失敗しました。');
        }
      );
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate('MemoCreate');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});
