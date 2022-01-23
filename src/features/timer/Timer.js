import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Colors } from '../../utils/colors';
import { Spacing } from '../../utils/spacing';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progressState, setProgressState] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgressState(progress);
  };

  const vibrate = () => {
    const interval = setInterval(() => Vibration.vibrate(), 1000);
    setTimeout(() => clearInterval(interval), 7000);
  };

  const onEnded = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgressState(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgressState(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnded={onEnded}
        />
      </View>
      <View style={{ paddingTop: Spacing.md }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ padding: Spacing.sm }}>
        <ProgressBar
          progress={progressState}
          style={{ height: 10 }}
          color="#363D7C"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            size={100}
            onPress={() => {
              setIsStarted(false);
            }}
          />
        ) : (
          <RoundedButton
            title="start"
            size={100}
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => {
            clearSubject();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
  },
  task: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  clearSubject: {
    padding: 25,
  },
});
