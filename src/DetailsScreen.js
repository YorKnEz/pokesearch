import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

const Item = ({ title, info }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}: {info}</Text>
    </View>
  )
  
function DetailsScreen({ route }) {
  const pokemon = route.params

  const pokemonURL = String(pokemon.sprites.front_default)

  const pokemonData = [
    {
      title: 'Name',
      info: pokemon.name
    },
    {
      title: 'Id',
      info: String(pokemon.id)
    },
    {
      title: 'Weight',
      info: (pokemon.weight/10) + ' kilograms'
    },
    {
      title: 'Height',
      info: (pokemon.height/10) + ' meters'
    }
  ]

  const renderItem = ({ item }) => (
    <Item title={item.title} info={item.info}/>
  )

  return (
    <View style={styles.detailsScreen}>
      <Image
        style={{ height: 260, width: 260,alignSelf: 'center' }}
        source={{ uri: pokemonURL }}
        resizeMethod='scale'
        resizeMode='cover'
      />
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, width: '100%', color: 'lightgray' }} />
        )}
        data={pokemonData}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  detailsScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'gray',
    textTransform: 'capitalize',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
  }
});

export default DetailsScreen