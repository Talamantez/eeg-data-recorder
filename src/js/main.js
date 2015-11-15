var React = require('react');

var DataContainer = React.createClass({
	render: function(){
		return (
			<div>Hey yalls from the data container</div>
		)
	}
});

React.render(
	<DataContainer />,
	document.getElementById('dataContainer')
);