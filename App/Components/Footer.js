import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.props.description}
          onChangeText={this.props.onDescChange}
          placeholder="Description"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={(event) => {
            this.refs.DateInput.focus();
          }}
        />
        <TextInput
          style={styles.input}
          ref="DateInput"
          value={this.props.date}
          onChangeText={this.props.onDateChange}
          placeholder="Date"
          returnKeyType="done"
          onSubmitEditing={this.props.onAddItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50
  }
});
