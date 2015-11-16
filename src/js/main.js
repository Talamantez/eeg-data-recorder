var React 		= require( 'react' );
var ReactDOM 	= require( 'react-dom' );
var io 			= require( 'socket.io-client' );

var DataViewContainer = React.createClass({
	getInitialState: function(){
		return {
					data: {
						views:[ {title:"First",		description: "Desc of first"},
								{title:"Second",	description: "Desc of second"},
								{title:"Third",		description: "Desc of third"}
						],
						rows:[
								{title: "Delta"		},			
							 	{title: "Theta"		},
							 	{title: "loAlpha"	},
							 	{title: "hiAlpha"	},
							 	{title: "loBeta"	},
							 	{title: "hiBeta"	},
							 	{title: "loGamma"	},
							 	{title: "midGamma"	}
						],
						values:[[],[],[]]
					}
		}
	},
	updateState: function( data ){
		console.log( 'updating state' );
		console.log( data )
		this.setState( { data:  {
							values: { data }
						} 
					} );
		console.log( this.state.data.values );
	},
	handleSocket:  function( trigger, callback ){
    	console.log( 'self from SocketHandler: ' );
		var trigger 	= trigger;
		var socket 		= io();
		var data;
		var update = function( data ){
			if( callback ){
				callback( data );
			}
		};
		socket.on( trigger, function( data ){
				console.log( 'View Container Triggered' );
				data = data;
				update( data );
		});
	},
	render: function(){
		console.log('RENDERRING  this.state: ');
		console.dir( this.state );
		this.handleSocket( 'brain-data', this.updateState );

		console.log( this.state.data.values );

		var dataSetArray = this.state.data.values.map( function( value, idx ){

		} )
		var rows = this.state.data.rows;
		var viewArray = this.state.data.views.map( function( view, idx ){
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
			<div>
				<h5>{ this.props.title }</h5>
				<div>{ this.props.value }</div>
			</div>

		)
	}
});

ReactDOM.render(
	<DataViewContainer />,
	document.getElementById('dataContainer')
);