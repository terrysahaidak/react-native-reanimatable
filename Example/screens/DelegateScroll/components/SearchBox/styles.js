import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    borderRadius: 11,
    paddingLeft: 8,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 17,
    marginLeft: 7,
  },
  icon: {
    top: 1.5,
  },
});

export default styles;
