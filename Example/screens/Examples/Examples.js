import React from 'react';
import { FlatList } from 'react-native';
import screens from '../../navigation/screens';
import { ListItem, Separator } from '../../components';
import { NavigationService } from '../../services';

const list = [
  { title: 'Base transition', screen: screens.TransitionBase },
  { title: 'Keyframes (interpolation)', screen: screens.Keyframes },
  { title: 'Delegate (Scroll)', screen: screens.DelegateScroll },
];

const Examples = () => {
  const renderItem = ({ item }) => (
    <ListItem
      {...item}
      onPress={() =>
        NavigationService.navigate(item.screen, { title: item.title })
      }
    />
  );

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
      keyExtractor={(item) => item.title}
    />
  );
};

Examples.navigationOptions = {
  title: 'Examples',
};

export default Examples;
