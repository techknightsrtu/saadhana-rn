// File: ../screens/UserDetail.js
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../assets/styles/stylesUserDetail';
import UserDetailBox from '../component/UserDetail/UserDetailBoxes';

const UserDetail = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e59479' }}>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.shloka}>
              सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।{'\n'}
              अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥{'\n'}
            </Text>
            <Text style={{ color: '#c0755d', fontSize: 14, marginBottom: 15 }}>
              श्रीमद्भगवद्गीता अध्याय 18 श्लोक 66
            </Text>
          </View>

          <UserDetailBox />
        </ScrollView>
      </View>
    </View>
  );
};

export default UserDetail;
