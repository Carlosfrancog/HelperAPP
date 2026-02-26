import { useContext, useEffect } from 'react';
import { Redirect } from 'expo-router';
import { AuthContext } from '../contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/profile" />;
  }

  return <Redirect href="/login" />;
}
