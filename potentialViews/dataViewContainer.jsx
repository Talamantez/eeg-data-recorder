var DataViewContainer = React.createClass({
    render: function(){
        return(
            <div> Hi from the DataViewContainer </div>
        )
    }
});

React.render(
  <DataViewContainer />,
  document.getElementById('dataViewContainer')
);