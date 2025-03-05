import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import history_style from '../../util/style/HistoryStyle'
import { BottomComponent } from '../../components'
import { changeLanguageAction } from '../../redux/cache'
import i18n from '../../localization'

const Language = () => {
    const { theme, locale } = useAppSelector(state => state.cache)
    const dispatch = useAppDispatch()

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[history_style.card, { backgroundColor: theme.bgDark, marginHorizontal: 16 }]}>
                <BottomComponent
                    text={i18n.t('Khmer')}
                    onPress={() => dispatch(changeLanguageAction('kh'))}
                    isTicked={locale == 'kh' ? true : false}
                />
                <BottomComponent
                    text={i18n.t('English')}
                    disabledborderBottom={true}
                    onPress={() => dispatch(changeLanguageAction('en'))}
                    isTicked={locale == 'en' ? true : false}
                />
            </View>
        </View>
    )
}

export default Language

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})