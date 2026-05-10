import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-large" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chatting"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Feather name="map-pin" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome5 name="star" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Entypo name="dots-three-horizontal" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
