var React = require('react');
var ReactDOM = require('react-dom');

var DataViewContainer = React.createClass({
	render: function(){
		return (
			<div>
				<h3>
					Hey yalls from the Data View Container
				</h3>
				<DataView />
			</div>
		)
	}
});

var DataView = React.createClass({
	render: function(){
		return (
			<div>
				<h4>
					Hey yalls from a Data View
				</h4>
				<DataRow />
				<DataRow />
			</div>
		)
	}
});

var DataRow = React.createClass({
	render: function(){
		return (
			<div>Hey yalls from a Data Row</div>
		)
	}
});

ReactDOM.render(
	<DataViewContainer />,
	document.getElementById('dataContainer')
);