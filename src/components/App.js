import React from "react";
import { connect } from "react-redux";
import Home from "../components/Home";
import jsonData from "../data/mock_data.json";

class App extends React.Component {
	render() {
		return <Home list={jsonData} />;
	}
}

export default connect(
	null,
	null
)(App);
