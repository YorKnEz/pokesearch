import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const Item = ({ name, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{name}</Text>
  </TouchableOpacity>
)

function HomeScreen({ navigation }) {
  const [input, setInput] = useState("")
  const [arr, setArr] = useState([])
  const [nextURL, setNextURL] = useState("")

  const fetchPokemonData = async (url) => {
    const result = await fetch(url)
      .then(response => response.json())
      .catch(error => {console.error('Fetch error: ', error)})

    if (result !== undefined) {
      navigation.navigate('Details', result)
    }
  }

  const fetchPokemonDataBulk = async (url) => {
    const result = await fetch(url)
      .then(response => response.json())
      .catch(error => {console.error('Fetch error: ', error)})

    if (result !== undefined) {
      setArr(arr.concat(result.results))
      setNextURL(result.next)
    }
  }

  useEffect(() => {
    fetchPokemonDataBulk('https://pokeapi.co/api/v2/pokemon')
  }, [])

  const renderItem = ({ item }) => (
    <Item name={item.name} onPress={() => fetchPokemonData(item.url)} />
  )

  return (
    <View>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => {fetchPokemonData('https://pokeapi.co/api/v2/pokemon/' + input)}}>
          <FontAwesome5
          name="search"
          size={24}
          color="lightgray"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search for a Pokemon"
          onChangeText={text => setInput(text.toLowerCase())}
        />
      </View>
      <FlatList
        data={arr}
        renderItem={renderItem}
        onEndReached={() => fetchPokemonDataBulk(nextURL)}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  input: {
    height: 50,
    width: '80%',
    paddingLeft: 10
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

export default HomeScreen