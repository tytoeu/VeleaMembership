import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Import Ionicons from your library

interface IoniconsProps {
    name: string;
    size: number;
    color: string;
    type: 'Ionicons' | 'FontAwesome'
}

const MyIconComponent = (props: IoniconsProps) => {
    return props.type == 'Ionicons' ? <Ionicons {...props} /> : <FontAwesome {...props} />;
};

export default MyIconComponent