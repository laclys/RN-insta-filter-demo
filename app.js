import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-native';
import ImagePicker from 'react-native-image-crop-picker'; 
import data from './data.json'

const {height, width} = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      imageSrc: null
    }
  }

  handleClick= () => {
    ImagePicker.openPicker({  
      width: width,
      height: width,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      this.setState({
        imageSrc: image.path
      })
    });  
  }

  renderImageWrapper () {
    return this.state.imageSrc ? (
      <View style={styles.photoWrapper} >
        <Image
          style={{
            width: width,
            height: width
          }}
          source={{uri: this.state.imageSrc}}
        />
      </View>
    ) : (
      <TouchableOpacity
        style={styles.photoWrapper}
        activeOpacity={0.8}
        onPress={this.handleClick}
      >
        <Text style={styles.plusIcon} >+</Text>
      </TouchableOpacity>
    )
  }

  listItem () {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        activeOpacity={0.8}
      >
        <Image
          style={styles.itemImage}
          source={{uri: this.state.imageSrc}}
        />
      </TouchableOpacity>
    )
  }

  renderInstaFilterShow () {
    return this.state.imageSrc ? (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={styles.filterList}
        renderItem={({item}) => this.listItem(item)}
      />
    ) : null
  }

  render() {
    console.log(this.state.imageSrc)
    return (
      <View style={styles.container}>
        <Text style={styles.topTitle} >Insta_demo</Text>
        {this.renderImageWrapper()}
        {this.renderInstaFilterShow()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  topTitle: {
    marginTop: 40,
    marginBottom: 3,
    fontSize: 14
  },
  photoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    width: width,
    height: width,
    backgroundColor: '#e1e4ea'
  },
  plusIcon: {
    fontSize: 50
  },
  filterList: {
    alignItems: 'flex-start',
    paddingHorizontal: 15
  },
  itemWrapper: {
    width: 150,
    height: 150,
    marginHorizontal: 15,
    backgroundColor: 'blue'
  },
  itemImage: {
    width: 150,
    height: 150
  }
});

