import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import ProfileHeader from '@/components/ProfileHeader';




export default function Profile() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View>
      <ProfileHeader/>

      <Text variant="displaySmall" >Atlassss</Text>
      <Text variant="labelLarge">avecespienso@yahoo.com</Text>
      <Divider/>
      <Text>Profile data</Text>
      <Button>
        Change Email
      </Button>
      <Button>
        Change Password
      </Button>
      <Divider/>
      <Text variant="bodySmall">Settings</Text>
      <Button>
        Change Theme
      </Button>
      <Divider/>
      <Text variant="bodySmall">information</Text>
      <Button>
        About us
      </Button>
      <Button>
        F.A.Q
      </Button>
      <Divider/>
      <Text variant="bodySmall">Session</Text>
      <Button>
        Log out
      </Button>
      <Button>
        Delete account
      </Button>


    </View>
  );
}

