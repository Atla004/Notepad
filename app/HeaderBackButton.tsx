import React, { useState } from 'react'
import { IconButton, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { addListener } from '@alexsandersarmento/react-native-event-emitter';
import { useRouter } from 'expo-router';

const HeaderBackButton = () => {
    const theme = useTheme();
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const router = useRouter();
    const style = StyleSheet.create({
        button: {
            alignSelf: 'center',
            marginLeft: 1,
            paddingLeft: 1
        }
    });
    const pressHandler = () => {
        console.log('back button pressed')
        router.back();
    }
    addListener('allowGoBack', () => {
        setDisabledButton(false);
    })
    return (
        <IconButton
            icon='arrow-left' 
            style={style.button}
            animated={true}
            iconColor={theme.colors.shadow}
            onPress={pressHandler}
            disabled={disabledButton}
            loading={disabledButton}
        />

    )
}


export default HeaderBackButton
