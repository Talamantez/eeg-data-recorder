var React = require('react');
var ReactDOM = require('react-dom');
var io = require( 'socket.io-client' );

var DataViewContainer = React.createClass({
	
	updateState: function( data ){
		console.log('updating state');
		console.log('this: ');
		console.dir(this);
		this.setState( { data: {
			rows: data.rows
		} } );
	},
	handleSocket:  function( trigger, callback ){
    	console.log('self from SocketHandler: ');
		var trigger = trigger;
		var socket = io();
		var data = null;
		socket.on( trigger, function( data ){
						console.log('View Container Triggered');
						console.dir( data );				
		});
		if( callback ){
			callback( data );
		}
	},
	render: function(){
		console.log( this.props );
		this.handleSocket( 'brain-data', this.updateState() );

		var rows = this.props.data.rows;
		var viewArray = this.props.data.views.map( function( view, idx ){
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
		var rowArray = this.props.data.rows.map( function( row, idx ){
			return (
				<DataRow key={ idx } title={ row.title } value={ row.value }/>
			)
		} )
		return (
			<div>
				<h4>
					{ this.props.title }
					{ this.props.value }
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
			<div>{ this.props.title }</div>
		)
	}
});

ReactDOM.render(
	<DataViewContainer
			rows={[	{title: "Delta"		,value: 0},				
				 	{title: "Theta"		,value: 0},				
				 	{title: "loAlpha"	,value: 0},				
				 	{title: "hiAlpha"	,value: 0},				
				 	{title: "loBeta"	,value: 0},				
				 	{title: "hiBeta"	,value: 0},				
				 	{title: "loGamma"	,value: 0},				
				 	{title: "midGamma"	,value: 0}
			]}   

			views={[ {title:"First",	description: "Desc of first"},
					 {title:"Second",	description: "Desc of second"},
					 {title:"Third",	description: "Desc of third"}
			]}/>,
	document.getElementById('dataContainer')
);