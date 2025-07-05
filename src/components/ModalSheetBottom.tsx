// ModalSheetBottom.tsx
import React, {
    useCallback,
    useMemo,
    useRef,
    forwardRef,
    useImperativeHandle,
    ReactNode
} from 'react'

import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
    BottomSheetView
} from '@gorhom/bottom-sheet'
import { useAppSelector } from '../hooks'

interface ModalSheetBottomProps {
    children: ReactNode
    modalStyle?: any
    contentStyle?: any,
    snapPoint: string[]
}

export type ModalSheetBottomRef = {
    present: () => void
    close: () => void
}

const ModalSheetBottom = forwardRef<ModalSheetBottomRef, ModalSheetBottomProps>(
    ({ children, modalStyle, contentStyle, snapPoint }, ref) => {
        const bottomSheetModalRef = useRef<BottomSheetModal>(null)
        const snapPoints = useMemo(() => snapPoint, [])
        const { theme, currentTheme } = useAppSelector(state => state.cache)

        useImperativeHandle(ref, () => ({
            present: () => bottomSheetModalRef.current?.present(),
            close: () => bottomSheetModalRef.current?.close(),
        }))

        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                />
            ),
            []
        )

        return (
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    style={modalStyle}
                    backdropComponent={renderBackdrop}
                    backgroundStyle={{ backgroundColor: currentTheme == 'light' ? 'white' : 'black' }}
                    handleStyle={{ backgroundColor: theme.bgDark, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                    handleIndicatorStyle={{ backgroundColor: '#888' }}
                >
                    <BottomSheetScrollView style={{ flex: 1 }}>
                        {children}
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        )
    }
)

export default ModalSheetBottom
