var React 		= require( 'react' );
var ReactDOM 	= require( 'react-dom' );
var io 			= require( 'socket.io-client' );

var DataViewContainer = React.createClass({
	linkedSocket: false,
	getInitialState: function(){
		return {
				views:[],
				badSignal: true
		}
	},
	updateState: function( data ){
		// checked
		this.setState( { views: data } );
	},
	handleSocket:  function( trigger, callback ){
		this.linkedSocket = true;
		var socket 		= io();
		var data = [];
		var update = function( data ){
			// checked
			if( callback ){
				callback( data );
			}
		};
		socket.on( trigger, function( brainData ){
				// checked
				data = brainData;
				update( data );
		});
	},
	setBadSignal: function(){
		if( this.state.badSignal === false ){
			this.setState({ badSignal:true });
		}
	},
	setGoodSignal: function() {	
		if( this.state.badSignal === true ){
			this.setState({ badSignal:false });		
		}
	},
	linkSocket: function(){
		this.handleSocket( 'brain-data' , this.updateState   );
		this.handleSocket( 'poor-signal', this.setBadSignal  );
		this.handleSocket( 'good-signal', this.setGoodSignal );
	},
	render: function(){
		if( this.linkedSocket !== true ){
			console.log('linking socket');
			this.linkSocket();
		}
		var signalQuality;
		if( !this.state.badSignal ){
			signalQuality = 'good';
		} else {
			signalQuality = 'poor';
		}
		var viewArray = this.state.views.map( function( view, idx ){
			return (
				<DataView key={ idx } title={ view.title } desc={ view.description } values={ view.values }/>
			)
		} );

		return (
			<div className="row col-xs-12 dataContainer">
				<div>
					<h1>EEG Readings</h1>
					<SignalMonitor signalQuality={ signalQuality }/>
				</div>
				{ viewArray }
			</div>
		)
	}
});

var DataView = React.createClass({
	render: function(){
		var vals = this.props.values;
		var rowArray = [];
			for( var key in vals ){
				if( key != '_id'){
					this.props.waveform = key;
					this.props.reading = vals[ key ];
					rowArray.push (
						<div>
							<DataRow title={ this.props.waveform } value={ this.props.reading }/>
						</div>
					)
				}
			}
		return (
			<div className="col-sm-4 col-xs-12 dataView">
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
			<div className="col-xs-12 dataRow">
				<div className="col-xs-6 title">{ this.props.title }</div>
				<div className="col-xs-6 value">{ this.props.value }</div>
			</div>

		)
	}
});

var SignalMonitor = React.createClass({
	render: function(){
		return (
			<div className="signalQuality">
				{ this.props.signalQuality } signal
			</div>
		)
	}
});

ReactDOM.render(
	<DataViewContainer />,
	document.getElementById('dataContainer')
);