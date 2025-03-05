import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from your library

interface IoniconsProps {
    name: string;
    size: number;
    color: string;
}

const MyIconComponent = (props: IoniconsProps) => {
    return <Ionicons {...props} />;
};

export default MyIconComponent