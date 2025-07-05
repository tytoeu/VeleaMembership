import { categorySeleted, subCategorySeleted } from '../redux/menu'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { ICategory } from '../hooks/interface/IMenu'
import menuStyle from '../util/style/MenuStyle'
import React from 'react'

interface IProp {
    item: ICategory;
}

const CategoryCard = (prop: IProp) => {
    const { theme } = useAppSelector((state) => state.cache)
    const { cateId } = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch()

    const onPress = () => {
        dispatch(categorySeleted(prop.item.categoryId))
        dispatch(subCategorySeleted(0))
    }

    const selected = cateId == prop.item.categoryId

    return (
        <TouchableOpacity style={[menuStyle.category]} onPress={onPress}>
            <Text style={[menuStyle.cate_text, { color: selected ? 'red' : theme.color }]}>{prop.item.name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard