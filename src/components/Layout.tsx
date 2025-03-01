import { KeyboardAvoidingView, ScrollView, ScrollViewProps } from 'react-native'
import React, { ReactNode } from 'react'
import { useAppSelector } from '../hooks'

interface LayoutProps extends ScrollViewProps {
    children: ReactNode
}

const Layout = ({ children, ...props }: LayoutProps) => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            backgroundColor: theme.background
        }}>
            <ScrollView {...props} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Layout