class NavigationService {
  navigation = null;

  init(ref) {
    this._ref = ref;
    this.navigation = this._ref._navigation;
  }

  navigate(screen) {
    this.navigation.navigate(
      typeof screen === 'object' ? screen : { routeName: screen },
    );
  }
}

export default new NavigationService();
