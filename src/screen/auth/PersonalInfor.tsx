import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useRoute } from '@react-navigation/native'
import i18n from '../../localization'
import useInputText from '../../hooks/useInputText'
import { formatDateBirthDay } from '../../helpers'
import { Button } from 'react-native-paper'
import useAuth from '../../hooks/useAuth'
import { IPersanlChange } from '../../hooks/interface/ISignin'
import { ToastMessage } from '../../components/ToastMessage'
import { actionChangePersonalInfor } from '../../redux/temp'
import ModalSheetBottom, { ModalSheetBottomRef } from '../../components/ModalSheetBottom'

interface IMembership {
    membership: {
        name: string;
        gender: string;
        dob: string;
        phone: string;
        created_at: string;
    }
}

const PersonalInfor = () => {
    const { theme, auth } = useAppSelector(state => state.cache)
    const { personalChange } = useAppSelector(state => state.temp)
    const router = useRoute();
    const { membership } = router.params as IMembership;
    const { handleErrorChange, handleTextChange, input, error, setInput } = useInputText()
    const { changePersonalInforMutation } = useAuth()
    const dispatch = useAppDispatch()
    const tempMember = membership
    const [updated, setUpdated] = useState(false)
    const modalRef = useRef<ModalSheetBottomRef>(null)

    useEffect(() => {
        if (!updated) {
            setInput(tempMember)
            handleErrorChange('name', '')
            handleErrorChange('gender', '')
            handleErrorChange('dob', '')
        }
    }, [personalChange, updated])

    useEffect(() => { setUpdated(false) }, [input])

    useEffect(() => { setInput(membership) }, [])

    const handleUpdatePersonalInfor = () => {
        let isValid = true;
        if (!input?.name) {
            handleErrorChange('name', i18n.t('Please enter your name'))
            isValid = false;
        }
        if (!input?.gender) {
            handleErrorChange('gender', i18n.t('Please select your gender'))
            isValid = false;
        }
        if (!input?.dob) {
            handleErrorChange('dob', i18n.t('Please enter your date of birth'))
            isValid = false;
        }
        if (isValid) {
            const jsonData: IPersanlChange = {
                id: auth?.id as number,
                name: input?.name as string,
                gender: input?.gender as string,
                dob: input?.dob as string
            }

            changePersonalInforMutation.mutateAsync(jsonData, {
                onSuccess(data) {
                    console.log(data)
                    if (data.status) {
                        dispatch(actionChangePersonalInfor(false))
                        setUpdated(true)
                        ToastMessage(data.message)
                    } else {
                        ToastMessage(data.message, undefined, 'red')
                        setUpdated(false)
                    }
                },
            })
        }
    }

    const handleDateChange = (text: string) => {
        const formatted = formatDateBirthDay(text);
        handleTextChange('dob', formatted);
    }

    const borderColor = personalChange ? theme.main : theme.border;

    return (
        <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <View style={styles.content}>
                <Text style={[{ color: theme.color }, styles.title]}>{i18n.t('My Information')}</Text>

                <View style={{ marginTop: 20 }}>
                    <Text style={[{ color: theme.color }, styles.label]}>{i18n.t('Name')}</Text>
                    <TextInput
                        readOnly={!personalChange}
                        value={input?.name}
                        style={[styles.theme_text_container, { color: theme.colorText, borderBottomColor: error?.name ? 'red' : borderColor }]}
                        onChangeText={(text) => handleTextChange('name', text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[{ color: theme.color }, styles.label]}>{i18n.t('Gender')}</Text>
                    <TextInput
                        readOnly={!personalChange}
                        value={input?.gender}
                        style={[styles.theme_text_container, { color: theme.colorText, borderBottomColor: error?.gender ? 'red' : borderColor }]}
                        onChangeText={(text) => handleTextChange('gender', text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[{ color: theme.color }, styles.label]}>{i18n.t('Date of Birth')}</Text>
                    <TextInput
                        readOnly={!personalChange}
                        value={input?.dob}
                        style={[styles.theme_text_container, { color: theme.colorText, borderBottomColor: error?.dob ? 'red' : borderColor }]}
                        onChangeText={(text) => handleDateChange(text)}
                        keyboardType='number-pad'
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[{ color: theme.color }, styles.label]}>{i18n.t('Phone Number')}</Text>
                    <TextInput
                        readOnly={true}
                        value={input?.phone}
                        style={[styles.theme_text_container, { color: theme.colorText, borderBottomColor: theme.border }]}
                        onChangeText={(text) => handleTextChange('phone', text)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[{ color: theme.color }, styles.label]}>{i18n.t('Register Date')}</Text>
                    <TextInput
                        readOnly={true}
                        value={input?.created_at}
                        style={[styles.theme_text_container, { color: theme.colorText, borderBottomColor: theme.border }]}
                        onChangeText={(text) => handleTextChange('created_at', text)}
                    />
                </View>

                {!personalChange && <Button
                    onPress={() => modalRef.current?.present()}
                    contentStyle={{ paddingVertical: 5 }}
                    className='mt-10 font-semibold'
                    labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
                >
                    {i18n.t('Delete Account')}
                </Button>}

                {personalChange && <Button
                    style={{ position: 'absolute', bottom: 35, width: '100%' }}
                    contentStyle={{ paddingVertical: 5, backgroundColor: theme.bgDark }}
                    labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
                    mode='contained'
                    disabled={changePersonalInforMutation.isPending}
                    loading={changePersonalInforMutation.isPending}
                    textColor={theme.color}
                    onPress={handleUpdatePersonalInfor}>
                    {i18n.t('Update')}
                </Button>}

            </View>

            <ModalSheetBottom ref={modalRef} snapPoint={['80%']}>
                <View className='h-80'></View>
            </ModalSheetBottom>
        </View>
    )
}

export default PersonalInfor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '90%',
        flex: 1
    },
    title: {
        fontSize: 16,
        marginTop: 20,
        fontFamily: 'R700'
    },
    theme_text_container: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        paddingBottom: 10
    },
    label: {
        fontFamily: 'R700',
        fontSize: 14
    },
    value: {
        paddingTop: 8,
        fontFamily: 'R500'
    }
})