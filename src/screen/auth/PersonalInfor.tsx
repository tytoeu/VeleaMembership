import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../../hooks'
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
import { Layout, ThemeErrorText } from '../../components'
import { TextInput as TextInputPaper } from 'react-native-paper'
import { loginAction } from '../../redux/cache'

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
    const { changePersonalInforMutation, deleteAccountMutation } = useAuth()
    const dispatch = useAppDispatch()
    const nav = useAppNavigation()
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

    const deleteAccountAction = () => {

        if (!input?.confirm_password) {
            handleErrorChange('confirm_password', i18n.t('Confirm-Password is required'))
            return
        }

        const dataJson = {
            password: input?.confirm_password!,
            membership_id: auth?.id!
        }

        deleteAccountMutation.mutateAsync(dataJson, {
            onSuccess: (data) => {
                console.log(data)
                if (data?.status) {
                    nav.goBack()
                    dispatch(loginAction(null))
                    ToastMessage(data?.message)
                } else {
                    handleErrorChange('confirm_password', data?.message)
                }
            }
        })
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

                <Layout className='bg-white p-4 h-96'>
                    <Text className='text-lg leading-10 tracking-tight font-bold color-black/80'>
                        {i18n.t('Delete Your Account')}
                    </Text>
                    <Text className='font-normal leading-6 tracking-wide mb-5 color-black/80'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper dui congue hendrerit malesuada. Proin faucibus auctor pellentesque. Suspendisse viverra justo risus, id ultricies quam porta non.
                    </Text>
                    <TextInputPaper
                        label={i18n.t('Confirm Password')}
                        secureTextEntry={true}
                        onChangeText={text => handleTextChange('confirm_password', text)}
                        onFocus={() => handleErrorChange('confirm_password', '')}
                        onBlur={() => handleErrorChange('confirm_password', input?.confirm_password ? '' : i18n.t('Confirm-Password is required'))}
                        keyboardType='number-pad'
                        maxLength={4}
                        error={error?.confirm_password ? true : false}
                        textColor={'black'}
                        outlineColor={theme.main}
                        theme={{ colors: { onSurfaceVariant: theme.main } }}
                        className='bg-white rounded-sm '
                    />
                    <View className='mt-6'>
                        <ThemeErrorText textError={error?.confirm_password!} />
                    </View>

                    <Button
                        onPress={deleteAccountAction}
                        mode='contained-tonal'
                        contentStyle={{ paddingVertical: 5 }}
                        className='mt-10 font-semibold'
                        labelStyle={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}
                        style={{ width: 200, alignSelf: 'center', backgroundColor: '#808b96' }}
                        loading={deleteAccountMutation.isPending}
                        disabled={deleteAccountMutation.isPending}
                    >
                        {i18n.t('Delete Account')}
                    </Button>

                </Layout>

            </ModalSheetBottom>
        </View>
    )
}

export default PersonalInfor

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'red'
    },
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