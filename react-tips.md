 - break down views into modular components
 - one way data flow - data flows into them
 - uses virtual dom

 data -> react app -> view
 data changes -> react app -> updated view

 angular, etc renders new view for each change - react renders only bit that changes

 jsx - compiles html views into javascipt react can 

 _______________________________________________________-

 React.createClass()
 	-requires render
 		render:
 			define structure of react component in jsx (looks like html)
 			returns a single child
 React.render()
 	- renders react component
 	- Define a Hello component with a render functoin
 	-return a div with hello react

 	React.createComponent
________________________________________________

Step 1: Define and Render a React Component


Step 2 : pass statuic data into our component
pass ina string to display inside 
Props - passes data into and between components
	- xml-like attribute
	- accessed inside a component via this.props.propName


	React.render(
		<Comment author="Ken" />
	);

State: Internal to component

how dos a component's state get set and read
: getInitialState()
	set component's state as a hash

	return{
		stateName: stateValue
	}

	this.state.stateName
		-access a value in the component's state
			this.state.stateName -> stateValue

			this.setState()
				- updates component's state
				this.setState{
					stateName: stateValue
				}

trickle down click down to a child component
	step: 0 :  plan how to pass state to chilld component

set state on the component level, trickle state down through props into child components,
that way the sub components are reacting to changes and you never have to set something specifically in a child el

_______________-
Adding Styles

var styles = {
	text:{
		fontSize:'32px',
		fontWeight: '600',
		textDecoration: 'underline'
	},
	clickCount:{
		color: 'mediumaquamarine',
		fontSize: 24px
	}
}

Twitter
TweetForm
TweetList
Tweet


