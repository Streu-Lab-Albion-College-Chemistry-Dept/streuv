
import { 
  View, 
  StyleSheet,
} from "react-native";

interface ProfileCardProps {
  CurrentUser: string,
  Role?: 'student' | 'instructor'
  email?: string
}

export default function ProfileCard({ CurrentUser }: ProfileCardProps): React.JSX.Element {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: 200,
    height: 200
  }
})
