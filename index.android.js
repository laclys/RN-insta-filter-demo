import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import App from './app'

export default class insta_filter_demo extends Component {
  render() {
    return <App/>
  }
}

AppRegistry.registerComponent('insta_filter_demo', () => insta_filter_demo);