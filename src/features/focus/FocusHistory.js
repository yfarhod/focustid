import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { Spacing } from '../../utils/spacing';
import { Colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      {!!focusHistory.length && (
        <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
          <Text style={styles.title}>We've focused on:</Text>
          <FlatList
            style={{ flex: 1 }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
          <View style={styles.clearContainer}>
            <RoundedButton
              title="Clear"
              size={75}
              onPress={() => clearHistory()}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? Colors.red : Colors.green,
    fontSize: Spacing.md,
  }),
  title: {
    color: Colors.white,
    fontSize: Spacing.xl,
  },
  clearContainer: {
    alignItems: 'center',
    padding: Spacing.md,
  },
});
