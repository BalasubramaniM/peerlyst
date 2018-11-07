import React from "react";
import { connect } from "react-redux";
import { SEARCH, SORTBY, APP_LOAD } from "../../constants/actionTypes";

import "../../styles/variables.css";
import "../../styles/styles.css";
import "../../styles/nav.css";
import "../../styles/table.css";
import "../../styles/responsive.css";

const mapStateToProps = state => ({
	...state.common
});

const mapDispatchToProps = dispatch => ({
	onChangeSearch: value => dispatch({ type: SEARCH, value }),
	onSortBy: value => dispatch({ type: SORTBY, value }),
	onLoad: () => dispatch({ type: APP_LOAD })
});

const CardLayout = props => {
	const formatDate = str => {
		let date = new Date(str);
		return date.toISOString().substring(0, 10);
	};

	return props.arrayData.map(val => (
		<React.Fragment key={val.name}>
			<div className="feed card">
				<div className="card-image">
					<img src={val.image} alt={val.name} />
				</div>
				<div className="card-content">
					<p className="name">{val.name}</p>
					<p className="desc">{val.description}</p>
					<p className="date">{formatDate(val.date)}</p>
				</div>
			</div>
		</React.Fragment>
	));
};

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.onSelect = this.onSelect.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	// Get props once component is loaded.
	componentDidMount() {
		this.props.onLoad();
	}

	// Format date to readable format.
	formatDate(str) {
		let date = new Date(str);
		return date.toISOString().substring(0, 10);
	}

	onSelect(event) {
		this.props.onSortBy(event.target.value);
	}

	onSearch(event) {
		this.props.onChangeSearch(event.target.value);
	}

	onChangeInput(event) {
		this.props.onChangeSearch(event.target.value);
	}

	render() {
		let arrayData = this.props.list;

		// For Table.
		let tableData = this.props.list.slice(0, 5);

		// Search by keywords
		if (this.props.search) {
			let searchRegex = new RegExp(this.props.search.toLowerCase());

			// Search filter
			// Search by title or description
			arrayData = arrayData.filter(val => {
				return (
					searchRegex.test(val.name.toLowerCase()) ||
					searchRegex.test(val.description.toLowerCase())
				);
			});
		}

		// Sortby title or date.
		if (this.props.sortby === "title") {
			arrayData.sort((a, b) => {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
		} else {
			arrayData.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});
		}

		// Handle null cases.
		let cardLayout;
		if (arrayData.length === 0) {
			cardLayout = (
				<p className="title">
					No feeds available for the given search criteria.
				</p>
			);
		} else {
			cardLayout = <CardLayout arrayData={arrayData} />;
		}

		return (
			<React.Fragment>
				<nav>
					<p>Peerlyst</p>
				</nav>
				<section>
					<div className="container">
						<div className="select-boxes">
							<div>
								<p className="subtitle">
									Search by title and description.
								</p>
								<input
									type="text"
									className="input search"
									placeholder="Search ..."
									onKeyUp={this.onSearch}
									value={this.props.search}
									onChange={this.onChangeInput}
								/>
							</div>
							<div>
								<p className="subtitle">
									Sort by title and date.
								</p>
								<select
									value={this.props.sortby}
									onChange={this.onSelect}
								>
									<option value="title">Title</option>
									<option value="date">Date</option>
								</select>
							</div>
						</div>
						<div className="feed-boxes">
							<p className="subtitle title">Feeds</p>
							<div className="feeds">{cardLayout}</div>
						</div>
						<div className="table-div">
							<table className="table-container">
								<thead>
									<tr>
										<th>Name</th>
										<th>Image</th>
										<th>Description</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{tableData.map(val => (
										<React.Fragment key={val.name}>
											<tr>
												<td className="table-name">
													{val.name}
												</td>
												<td>
													<div className="table-image">
														<img
															src={val.image}
															alt={val.name}
														/>
													</div>
												</td>
												<td>{val.description}</td>
												<td className="table-date">
													{this.formatDate(val.date)}
												</td>
											</tr>
										</React.Fragment>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
