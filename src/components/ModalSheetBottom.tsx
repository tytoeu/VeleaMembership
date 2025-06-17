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
    BottomSheetView
} from '@gorhom/bottom-sheet'

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
                >
                    <BottomSheetView style={contentStyle}>
                        {children}
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        )
    }
)

export default ModalSheetBottom
