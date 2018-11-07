import React from "react";
import App from "../components/Home";
import Home from "../components/Home";
import { store } from "../store";
import renderer from "react-test-renderer";
import jsonData from "../data/mock_data.json";

describe("App", () => {
	it("Should render component", () => {
		const wrapper = shallow(<App store={store} />);
		expect(wrapper.length).toEqual(1);
	});
});

describe("Home", () => {
	it("Should render component", () => {
		const wrapper = shallow(<Home store={store} />);
		expect(wrapper.length).toEqual(1);
	});

	it("Should display a list of feeds", () => {
		const tree = renderer
			.create(<Home list={jsonData} store={store} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Should render a table with 1 header and 5 rows", () => {
		const wrapper = shallow(<Home list={jsonData} store={store} />);

		const numberOfTableRows = wrapper.dive().find("tr").length;
		expect(numberOfTableRows).toEqual(6);
	});

	it("Should sort by title", () => {
		const wrapper = shallow(<Home list={jsonData} store={store} />);

		wrapper
			.dive()
			.find("select")
			.at(0)
			.simulate("change", { target: { value: "title" } });

		expect(
			wrapper
				.dive()
				.find("select")
				.prop("value")
		).toEqual("title");
	});

	it("Should sort by date", () => {
		const wrapper = shallow(<Home list={jsonData} store={store} />);

		wrapper
			.dive()
			.find("select")
			.at(0)
			.simulate("change", { target: { value: "date" } });

		expect(
			wrapper
				.dive()
				.find("select")
				.prop("value")
		).toEqual("date");
	});

	it("Should search by keywords", () => {
		const wrapper = shallow(<Home list={jsonData} store={store} />);

		wrapper
			.dive()
			.find("input")
			.at(0)
			.simulate("change", { target: { value: "Chief" } });

		expect(
			wrapper
				.dive()
				.find("input")
				.prop("value")
		).toEqual("Chief");
	});
});
