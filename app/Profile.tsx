import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import ProfileHeader from '@/components/ProfileHeader';
import { PeopleIcon,PersonIcon } from '@/components/Icon';


export default function Profile() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View>
      <ProfileHeader/>

      <Text variant="displaySmall" >Atlassss</Text>
      <Text variant="labelLarge">avecespienso@yahoo.com</Text>
      <Divider/>
      <Text>Profile data</Text>
      <Button
      icon="account"
      >
        Change Email
      </Button>
      <Button
      icon= "lock"
      >
        Change Password
      </Button>
      <Divider/>
      <Text variant="bodySmall">Settings</Text>
      <Button
      icon="theme-light-dark"
      >
        Change Theme
      </Button>
      <Divider/>
      <Text variant="bodySmall">information</Text>
      <Button
      icon="information"
      >
        About us
      </Button>
      <Button
      icon="help-circle"
      >
        F.A.Q
      </Button>
      <Divider/>
      <Text variant="bodySmall">Session</Text>
      <Button
      icon="logout"
      >
        Log out
      </Button>
      <Button
      icon="delete"
      >
        Delete account
      </Button>


    </View>
  );
}

