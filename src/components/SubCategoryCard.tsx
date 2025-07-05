import { View, Text, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { ISubCategory } from '../hooks/interface/IMenu'
import { subCategorySeleted } from '../redux/menu'
import menuStyle from '../util/style/MenuStyle'
import React from 'react'

interface IProp {
    item: ISubCategory
}

const SubCategoryCard = (prop: IProp) => {
    const { theme } = useAppSelector((state) => state.cache)
    const { subCateId } = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch()

    const selected = subCateId == prop.item.subId
    return (
        <TouchableOpacity style={[menuStyle.category]} onPress={() => dispatch(subCategorySeleted(prop.item.subId))}>
            <Text style={[menuStyle.cate_text, { color: selected ? 'red' : theme.color }]}>{prop.item.name}</Text>
        </TouchableOpacity>
    )
}

export default SubCategoryCard