import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks'
import menuStyle from '../util/style/MenuStyle'
import { ISubCategory } from '../hooks/interface/IMenu'
import useMenu from '../hooks/useMenu'

interface IProp {
    item: ISubCategory,
    setSelectedSubCategoryId: (subId: string) => void,
    selected: boolean
}

const SubCategoryCard = (prop: IProp) => {
    const { theme } = useAppSelector((state) => state.cache)

    return (
        <TouchableOpacity style={[menuStyle.category]} onPress={() => prop.setSelectedSubCategoryId(prop.item.subId.toString())}>
            <Text style={[menuStyle.cate_text, { color: prop.selected ? 'red' : theme.color }]}>{prop.item.name}</Text>
        </TouchableOpacity>
    )
}

export default SubCategoryCard