import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type DummyPageProps = NativeStackScreenProps<RootStackParamList, 'DummyPage'>

export default function DummyPage({ navigation } : DummyPageProps){
    return(
        <View style={styles.container}>
            <Text>Liked Movies</Text>
            <StatusBar style="auto" />
            <Button
            title='Navigate back to HomePage'
            onPress={() => navigation.navigate('HomePage')}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

