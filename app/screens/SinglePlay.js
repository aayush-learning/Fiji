import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import Quiz from './Quiz';

export default class SinglePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizFinish: false,
      score: 0
    };
  }
  
  _quizFinish(score) {    
    this.setState({ quizFinish: true, score });
  }
  _scoreMessage(score) {
    if (score <= 30) {
      return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: 'row' }} >
                  <Icon name="sentiment-very-dissatisfied" size={30} color="white" />
                </View>
                <Text style={styles.score}>You need to work hard</Text>
                <Text style={styles.score}>You scored {score}</Text>
              </View>);
    } else if (score > 30 && score < 60) {
      return (<View style={styles.innerContainer} >
                  <View style={{ flexDirection: 'row' }} >
                    <Icon name="sentiment-satisfied" size={30} color="white" />
                    <Icon name="sentiment-satisfied" size={30} color="white" />
                  </View>
                  <Text style={styles.score}>You are good</Text>
                  <Text style={styles.score}>Congrats you scored {score} </Text>
                </View>);
    } else if (score >= 60) {
      return (<View style={styles.innerContainer}>
                 <View style={{ flexDirection: 'row' }} >
                     <Icon name="whatshot" size={30} color="white" />
                     <Icon name="whatshot" size={30} color="white" />
                     <Icon name="whatshot" size={30} color="white" />
                  </View>
                  <Text style={styles.score}>You are the master</Text>
                  <Text style={styles.score}>Congrats you scored {score} </Text>
                </View>);
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>Current Score - {this.state.score}</Text>
      </View>
 
       { this.state.quizFinish ? <View ref="ScoreView" style={styles.container}>
           <View style={styles.circle}>
 
             { this._scoreMessage(this.state.score) }
           </View>
 
       </View> : <Quiz quizFinish={(score) => this._quizFinish(score)} /> }

      </View>
    );
  }
}
const scoreCircleSize = 300;
const styles = {
  score: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    backgroundColor: '#483d8b'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbar: {
        backgroundColor: '#483d8b',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarTitle: {
        color: '#fff',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    }
};
