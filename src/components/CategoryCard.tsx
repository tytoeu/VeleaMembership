import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks'
import menuStyle from '../util/style/MenuStyle'
import { ICategory } from '../hooks/interface/IMenu'

interface IProp {
    item: ICategory;
    setSelectedCategoryId: (cateId: string) => void;
    setSelectedCategory: (cateId: string) => void,
    setSelectedSubCategoryId: (subId: string) => void,
    seleted: boolean
}

const CategoryCard = (prop: IProp) => {
    const { theme } = useAppSelector((state) => state.cache)
    const onPress = () => {
        prop.setSelectedCategory('')
        prop.setSelectedCategoryId(prop.item.categoryId.toString())
        prop.setSelectedSubCategoryId('')
    }

    return (
        <TouchableOpacity style={[menuStyle.category]} onPress={onPress}>
            <Text style={[menuStyle.cate_text, { color: prop.seleted ? 'red' : theme.color }]}>{prop.item.name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard