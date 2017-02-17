import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import moment from 'moment';

export default class Row extends Component {
  render() {
    const now = moment().startOf('date');
    const date = moment(this.props.date);
    const count = date.diff(now, 'days');
    return (
      <View style={styles.container}>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category}>🕘</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.description}>{this.props.description}</Text>
          <Text style={styles.date}>{date.format('LL')}</Text>
        </View>
        <View style={styles.countWrapper}>
          <Text style={styles.count}>{count}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  countWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textWrapper: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center'
  },
  count: {
    fontSize: 24,
    color: '#0000ff'
  },
  category: {
    fontSize: 24
  },
  date: {
    fontSize:10,
    color: '#4d4d4d'
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
