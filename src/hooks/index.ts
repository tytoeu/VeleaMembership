import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppNavigation = () => useNavigation<NavigationProp<ParamListBase>>();
