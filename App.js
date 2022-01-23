import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { Spacing } from './src/utils/spacing';
import { Colors } from './src/utils/colors';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUS = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [subjectHistory, setSubjectHistory] = useState([]);

  const addFocusHistoryWithState = (subject, status) => {
    setSubjectHistory([...subjectHistory, { key: String(subjectHistory.length+1) ,subject, status }]);
  };

  const onClear = () => {
    setSubjectHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'subjectHistory',
        JSON.stringify(subjectHistory)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const loadedHistory = await AsyncStorage.getItem('subjectHistory');
      if (loadedHistory && JSON.parse(loadedHistory).length) {
        setSubjectHistory(JSON.parse(loadedHistory));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [subjectHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistoryWithState(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithState(focusSubject, STATUS.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={subjectHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? Spacing.xxxl : Spacing.md,
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
});
