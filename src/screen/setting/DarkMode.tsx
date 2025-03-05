import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import history_style from '../../util/style/HistoryStyle'
import { BottomComponent } from '../../components'
import { changeDarkModeAction } from '../../redux/cache'

const DarkMode = () => {
    const { theme, currentTheme } = useAppSelector(state => state.cache)
    const dispatch = useAppDispatch()

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[history_style.card, { backgroundColor: theme.bgDark, marginHorizontal: 16 }]}>
                <BottomComponent
                    text='On'
                    onPress={() => dispatch(changeDarkModeAction())}
                    isTicked={currentTheme == 'dark' ? true : false}
                />
                <BottomComponent
                    text='Off'
                    disabledborderBottom={true}
                    onPress={() => dispatch(changeDarkModeAction())}
                    isTicked={currentTheme == 'light' ? true : false}
                />
            </View>
        </View>
    )
}

export default DarkMode

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})