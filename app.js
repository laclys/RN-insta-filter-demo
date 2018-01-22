import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-native';
import ImagePicker from 'react-native-image-crop-picker'; 
import data from './data.json'
import F1977 from './filter/F1977'
import Amaro from './filter/Amaro'
import Brannan from './filter/Brannan'
import Earlybird from './filter/Earlybird'
import Hudson from './filter/Hudson'

const {height, width} = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      imageSrc: null,
      choosedFilter: null
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
        {this.renderBigPic()}
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

  renderBigPic() {
    switch (this.state.choosedFilter){
      case 'F1977':
        return (
          <Surface style={{width: width, height:width}}>
            <F1977 {...this.props}>
              {{uri:this.state.imageSrc}}
            </F1977>
          </Surface>
        )
      case 'Amaro':
        return (
          <Surface style={{width: width, height:width}}>
            <Amaro {...this.props}>
              {{uri:this.state.imageSrc}}
            </Amaro>
          </Surface>
        )
      case 'Brannan':
        return (
          <Surface style={{width: width, height:width}}>
            <Brannan {...this.props}>
              {{uri:this.state.imageSrc}}
            </Brannan>
          </Surface>
        )
      case 'Earlybird':
        return (
          <Surface style={{width: width, height:width}}>
            <Earlybird {...this.props}>
              {{uri:this.state.imageSrc}}
            </Earlybird>
          </Surface>
        )
      case 'Hudson':
        return (
          <Surface style={{width: width, height:width}}>
            <Hudson {...this.props}>
              {{uri:this.state.imageSrc}}
            </Hudson>
          </Surface>
        )
      default:
        return (
          <Image
            style={{
              width: width,
              height: width
            }}
            source={{uri: this.state.imageSrc}}
          />
        )
    }
  }

  chooseFilter (item) {
    this.setState({
      choosedFilter: item
    })
  }

  renderInstaFilterShow () {
    return this.state.imageSrc ? (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        // renderItem={({item}) => this.listItem(item)}
      >
        <TouchableOpacity
          style={styles.itemWrapper}
          activeOpacity={0.8}
          onPress={() => this.chooseFilter('F1977')}
        >
          <Surface style={{width: 150, height:150}}>
            <F1977 {...this.props}>
              {{uri:this.state.imageSrc}}
            </F1977>
          </Surface>
          <Text style={styles.filterText} >F1977</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          activeOpacity={0.8}
          onPress={() => this.chooseFilter('Amaro')}
        >
          <Surface style={{width: 150, height:150}}>
            <Amaro {...this.props}>
              {{uri:this.state.imageSrc}}
            </Amaro>
          </Surface>
          <Text style={styles.filterText} >Amaro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          activeOpacity={0.8}
          onPress={() => this.chooseFilter('Brannan')}
        >
          <Surface style={{width: 150, height:150}}>
            <Brannan {...this.props}>
              {{uri:this.state.imageSrc}}
            </Brannan>
          </Surface>
          <Text style={styles.filterText} >Brannan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          activeOpacity={0.8}
          onPress={() => this.chooseFilter('Earlybird')}
        >
          <Surface style={{width: 150, height:150}}>
            <Earlybird {...this.props}>
              {{uri:this.state.imageSrc}}
            </Earlybird>
          </Surface>
          <Text style={styles.filterText} >Earlybird</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          activeOpacity={0.8}
          onPress={() => this.chooseFilter('Hudson')}
        >
          <Surface style={{width: 150, height:150}}>
            <Hudson {...this.props}>
              {{uri:this.state.imageSrc}}
            </Hudson>
          </Surface>
          <Text style={styles.filterText} >Hudson</Text>
        </TouchableOpacity>
      </ScrollView>
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
    position: 'relative',
    width: 150,
    height: 150,
    marginHorizontal: 15,
    backgroundColor: 'white'
  },
  itemImage: {
    width: 150,
    height: 150
  },
  filterText: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 14,
    color: '#FFF',
    backgroundColor: 'transparent'
  }
});

