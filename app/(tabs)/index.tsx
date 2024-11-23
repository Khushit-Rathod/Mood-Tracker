import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Slider from '@react-native-community/slider'; // Ensure this is installed
import axios from 'axios';

const submitMood = async (mood: number, description: string) => {
  try {
    const response = await axios.post('http://localhost:3000/insights', {
      mood,
      description,
    });
    return response.data.insight;
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};

const MoodInputScreen = () => {
  const [mood, setMood] = useState<number>(3);
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const insight = await submitMood(mood, description);
      Alert.alert('AI Insight', insight);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch AI insights. Please try again.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Select your mood (1-5):</Text>
      <Slider
        value={mood}
        onValueChange={setMood}
        minimumValue={1}
        maximumValue={5}
        step={1}
        style={{ width: '100%', marginVertical: 20 }}
      />
      <TextInput
        placeholder="Describe your mood..."
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default MoodInputScreen;
