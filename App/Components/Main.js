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
import Footer from './Footer';

const sortItems = (dir, items) => {
  return items.sort((a, b) => {
    if (dir === 'ASC') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: true,
      sortDirection: 'ASC',
      description: '',
      date: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    };
    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem("countdownAppItems").then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, sortItems(this.state.sortDirection, items), { loading: false});
      } catch(e) {
        this.setState({
          loading: false
        });
      }
    });
  }

  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    });
    AsyncStorage.setItem("countdownAppItems", JSON.stringify(items));
  }

  handleAddItem() {
    if (!this.state.description || !this.state.date) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        description: this.state.description,
        date: this.state.date
      }
    ]
    this.setSource(newItems, sortItems(this.state.sortDirection, newItems), { description: "", date: "" })
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
        <Footer
          description={this.state.description}
          date={this.state.date}
          onAddItem={this.handleAddItem}
          onDescChange={(description) => this.setState({ description })}
          onDateChange={(date) => this.setState({ date })}
        />
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
