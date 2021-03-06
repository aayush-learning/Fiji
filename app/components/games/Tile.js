import React, { Component, PureComponent } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable';

export default class Tile extends Component {
  _onPressIn = () => {
    console.log('_onPressIn')
    this.props.onPress(this.props.id, this.refs.view)
  }

  _onStatusChange = (prevStatus, currentStatus) => {
    this.props.onStatusChange && this.props.onStatusChange(this.props.id, this.refs.view, prevStatus, currentStatus)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.text != nextProps.text
      || this.props.style.height != nextProps.style.height
      || this.props.style.width != nextProps.style.width
      || (this.props.status && (this.props.status != nextProps.status))) {
      this.props.onRender && this.props.onRender(this.props.id, this.refs.view)
      return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate:', this.props.id, prevProps.status, this.props.status)
    if (prevProps.status != this.props.status) {
      this._onStatusChange(prevProps.status, this.props.status)
    }
  }

  componentDidMount() {
    this.props.delegateTouch && this.props.delegateTouch({
      view: this.refs.inner,
      callback: this._onPressIn,
      reverse: this.props.reverse
    })
  }

  render() {
    console.log('Tile.render:' + this.props.text)
    const stylesForView = this.props.statusStyles
      && this.props.statusStyles[this.props.status]
      && this.props.statusStyles[this.props.status]['View']
      ?
      this.props.statusStyles[this.props.status]['View']
      :
      {}
      const stylesForText = this.props.statusStyles
      && this.props.statusStyles[this.props.status]
      && this.props.statusStyles[this.props.status]['Text']
      ?
      this.props.statusStyles[this.props.status]['Text']
      :
      {}
    return (
      <Animatable.View
        ref="view"
        useNativeDriver={true}
        style={[
          this.props.style,
          {
            alignItems: 'flex-start',
            alignSelf: 'center',
          }
        ]}
      >
          <View
            ref="inner"
            onStartShouldSetResponder={(e)=>true}
            onResponderGrant={(e)=>{this._onPressIn()}}
            style={{
              height: this.props.style.height,
              width: this.props.style.width,
              borderRadius: 8,
              position: 'absolute',
              // top: this.state.pressed ? 5 : 0,
              justifyContent: 'center',
              alignItems: 'center',
              shadowRadius: 8,
              shadowColor: 'grey',
              shadowOpacity: 1,
              elevation: 8,
              ...stylesForView
            }} >
            <Text style={{
              backgroundColor: 'transparent',
              // fontSize: Math.max(20, this.props.style.width - 40),
              fontSize: 24,
              ...stylesForText
            }}>
              {this.props.text}
            </Text>
          </View>
      </Animatable.View>
    )
  }
}

Tile.propTypes = {
  id: PropTypes.number,
  accessibilityLabel: PropTypes.string,
  status: PropTypes.string,
  onPress: PropTypes.func,
  onStatusChange: PropTypes.func,
  tileColor: PropTypes.string,
  pressedTileColor: PropTypes.string,
  edgeColor: PropTypes.string,
  pressedEdgeColor: PropTypes.string,
  text: PropTypes.string,
  delegateTouch: PropTypes.func,
  reverse: PropTypes.bool
}
