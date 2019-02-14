import React from 'react';
import T from 'prop-types';
import { FlatList } from 'react-native';
import screens from '../../navigation/screens';
import { ListItem, Separator } from '../../components';
import { NavigationService } from '../../services';

const list = [
  { title: 'Base transition', screen: screens.TransitionBase },
];

const Examples = () => {
  const renderItem = ({ item }) => (
    <ListItem
      {...item}
      onPress={() => NavigationService.navigate(item.screen)}
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

Examples.propTypes = {};

Examples.navigationOptions = {
  title: 'Examples',
};

export default Examples;
