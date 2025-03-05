import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import menuStyle from '../util/style/MenuStyle'
import { ICategory } from '../hooks/interface/IMenu'
import { categorySeleted, subCategorySeleted } from '../redux/menu'

interface IProp {
    item: ICategory;
}

const CategoryCard = (prop: IProp) => {
    const { theme } = useAppSelector((state) => state.cache)
    const { cateId } = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch()

    const onPress = () => {
        dispatch(categorySeleted(prop.item.categoryId.toString()))
        dispatch(subCategorySeleted(''))
    }

    const selected = cateId == prop.item.categoryId.toString()

    return (
        <TouchableOpacity style={[menuStyle.category]} onPress={onPress}>
            <Text style={[menuStyle.cate_text, { color: selected ? 'red' : theme.color }]}>{prop.item.name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard