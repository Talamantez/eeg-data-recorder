var React = require('react');
var ReactDOM = require('react-dom');

var DataViewContainer = React.createClass({
	render: function(){
		console.log( this.props );
		console.log( 'this.props: ' + this.props );
		var rows = this.props.rows;
		var viewArray = this.props.views.map( function( view, idx ){
			return (
				<DataView key={ idx } title={ view.title } desc={ view.description } rows={ rows }/>
			)
		} )
		return (
			<div>
				<h3>
					Hey yalls from the Data View Container
				</h3>
				{ viewArray }
			</div>
		)
	}
});

var DataView = React.createClass({
	render: function(){
		var rowArray = this.props.rows.map( function( row, idx ){
			return (
				<DataRow key={ idx } title={ row.title }/>
			)
		} )
		return (
			<div>
				<h4>
					{ this.props.title }
				</h4>
				<div>
					{ this.props.description }
				</div>
				{ rowArray }
			</div>
		)
	}
});

var DataRow = React.createClass({
	render: function(){
		return (
			<div>{this.props.title}</div>
		)
	}
});

ReactDOM.render(
	<DataViewContainer
		
		rows={
			[
				{
					title: "Delta",
				},				{
					title: "Theta"
				},				{
					title: "loAlpha"
				},				{
					title: "hiAlpha"
				},				{
					title: "loBeta"
				},				{
					title: "hiBeta"
				},				{
					title: "loGamma"
				},				{
					title: "midGamma"
				}
			]
		}  

		views={
			[					
				{
					title:"First",
					description: "Desc of first"
				},
				{
					title:"Second",
					description: "Desc of second"
				},
				{
					title:"Third",
					description: "Desc of third"
				}
			]
		}/>,
	document.getElementById('dataContainer')
);