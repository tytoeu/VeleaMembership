import { Text } from "react-native"
import styles from "../util/style/Style"

const ThemeErrorText = ({ textError }: { textError: string }) => {
    return <Text style={[{ color: 'red', alignSelf: 'flex-start' }, styles.textError]}>{textError}</Text>
}

export default ThemeErrorText