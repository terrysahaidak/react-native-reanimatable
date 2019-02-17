import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.background,
  },
  bottomContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  topContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    top: 20, // status bar height
    left: 0,
    right: 0,
    height: 44,
  },
  bigHeader: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 8,
  },
  smallHeader: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 17,
  },
  searchContainer: {
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    borderRadius: 11,
    paddingLeft: 16,
  },
  searchText: {
    color: colors.textSecondary,
    fontSize: 17,
  },
});

export default styles;
