import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { DatePickerDialog } from "react-native-datepicker-dialog";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class DatePickerTimePickerDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dobText: this.props.dateToEdit || "",
      dobDate: null,
    };
  }

  /**
   * DOB textbox click listener
   */
  onDOBPress = () => {
    let dobDate = this.state.dobDate;

    if (!dobDate || dobDate == null) {
      dobDate = new Date();
      this.setState({
        dobDate: dobDate,
      });
    }

    //To open the dialog
    this.refs.dobDialog.open({
      date: dobDate,
      maxDate: new Date(), //To restirct future date
    });
  };

  /**
   * Call back for dob date picked event
   *
   */
  onDOBDatePicked = (date) => {
    this.setState({
      dobDate: date,
      dobText: moment(date).format("YYYY-MM-DD"),
    });
    this.props.dateHandler(moment(date).format("YYYY-MM-DD"));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this.onDOBPress.bind(this)}>
            <View style={styles.input}>
              <Text style={styles.datePickerText}>
                <FontAwesome5
                  name={"calendar"}
                  style={{ textAlign: "right", marginLeft: 5 }}
                  light
                />{" "}
                {this.state.dobText ? this.state.dobText : "date"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
        <DatePickerDialog
          ref="dobDialog"
          onDatePicked={this.onDOBDatePicked.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  input: {
    marginVertical: 10,
    backgroundColor: "transparent",
    padding: 10,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
    height: 50,
  },
  datePickerBox: {
    marginTop: 9,
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: "center",
  },
  datePickerText: {
    fontSize: 14,
    lineHeight: 24,
    // textAlignVertical: "center",
    // marginLeft: 5,
    borderWidth: 0,
    color: "#121212",
  },
});

AppRegistry.registerComponent(
  "DatePickerTimePickerDialog",
  () => DatePickerTimePickerDialog
);
