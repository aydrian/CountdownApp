import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ListView,
  AsyncStorage
} from 'react-native';
import Row from './Row';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: true,
      items: [{key:1, date: '2017-07-25', description: 'My Birthday'}],
      dataSource: ds.cloneWithRows([{key:1, date: '2017-07-25', description: 'My Birthday'}])
    };
    this.setSource = this.setSource.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem("countdownAppItems").then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, { loading: false});
      } catch(e) {
        this.setState({
          loading: false
        });
      }
    });
  }

  setSource(item, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    });
    //AsyncStorage.setItem("countdownAppItems", JSON.stringify(items));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={({ key, ...value}) => {
              return (
                <Row
                  key={key}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator} />
            }}
          />
        </View>
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)"
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
});
