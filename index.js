import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import CHARMtheme from './theme';
import CHARMlogga from './logga';

import companies from './companies';

// Needed for onTouchTap
// Can go away when react 1.0 release
injectTapEventPlugin();

const CHARMloggaStyles = {
  width: '40px',
  height: '40px',
  color: '#0FF',
}

const emptyCompany = {
    "name":"",
    "letter":"",
    "website":"",
    "logoPath":"",
    "mapPath":"",
    "placement":"",
    "businessarea":"",
    "employeesSweden":0,
    "employeesWorld":0,
    "text":"",
    "contactName":"",
    "contactTitle":"",
    "contactEmail":"",
    "didyouknow":"",
    "ae":true,
    "a":true,
    "z":true,
    "bt":true,
    "d":true,
    "i":true,
    "e":true,
    "f":true,
    "it":true,
    "k":true,
    "kf":true,
    "m":true,
    "sjo":true,
    "v":true,
    "tm":true,
    "td":true,
    "thesis":true,
    "summer":true,
    "internship":true,
    "trainee":true,
    "abroad":true,
    "master":true,
    "bachelor":true,
    "phD":true
  }


var Filter = React.createClass({
  render: function() {
    return (
        <form>
          <label>Filter:</label>
          <input type="text" />
        </form>
        );
  }
});

var Company = React.createClass({
  render: function() {
    var url = "/company/" + identifier(this.props.data.name);
    return (
        <Link to={url} >
          <div className="company-item" >
            {this.props.data.name}
          </div>
        </Link>
        );
  }
});

function identifier(name) {
  return name.replace(/ /g, "-").toLocaleLowerCase()
}

var CompanyList = React.createClass({
  render: function() {

    var companies = this.props.data.map((company) => {
      return (<Company key={company.id} data={company}/>);
    });

    return (
        <div className="company-list" >
          {companies}
        </div>
        );
  }
});

var Companies = React.createClass({
  render: function() {
    return (
      <div>
        <Filter />
        <CompanyList data={this.props.data} />
      </div>
    );
  }
});

var BackButton = React.createClass({
  handelTouchTap: function() {
    history.back();
  },

  render: function() {
    return(
      <IconButton
        onTouchTap={this.handleTouchTap}
        onClick={this.handelTouchTap}
      >
        <NavigationArrowBack />
      </IconButton>
    );
  }
});

var CompanyAppBar = React.createClass({
  render: function() {
    return (
      <AppBar
        title={this.props.company.name}
        iconElementLeft={<BackButton />}
      />
    );
  }
});

var CompanyNotes = React.createClass({
  click: function() {
  },

  render: function() {
    return (
      <div>
        <textarea /*onClick={this.click} onInput={input}*/ cols="40" defaultValue="Notes..."  />
      </div>
    );
  }
});

var CompanyInfo = React.createClass({
  render: function() {
    return (
      <div>
        <img className="logo" src={this.props.company.logoPath} />
        <div>
          <em>Did you know?</em>
          <span> {this.props.company.didyouknow}</span>
        </div>
        <p>
          {this.props.company.text}
        </p>
      </div>
    );
  }
});

var CompanyPage = React.createClass({
  getCompany: function() {
    for(let i = 0; i < companies.length; i++) {
      if (companies[i].identifier === this.props.params.identifier) {
        return companies[i];
      }
    }
  },

  render: function() {
    return (
      <div>
        <CompanyAppBar company={this.getCompany()} />
        <CompanyNotes company={this.getCompany()} />
        <CompanyInfo company={this.getCompany()} />
      </div>
    );
  }
});

var CHARMtabs = React.createClass({
  getInitialState: function() {
    return{value: "companies"};
  },

  componentDidMount: function() {
    this.setState({value: this.props.value});
  },

  handleChange: (value) => {
    this.setState({
      value: value,
    });
  },

  render: function() {
    return (
      <Tabs value={this.state.value} onChange={this.handelChange} >
        <Tab value="other" icon={
          <CHARMlogga viewBox="0 0 100 81" style={CHARMloggaStyles} color={"#FFF"} />
        }>
          <div className="stuff" >
            Här kan det stå schyssta saker om event och kommittén osv.
          </div>
        </Tab>
        <Tab label="companies" value="companies">
          <Companies data={companies} />
        </Tab>
        <Tab label="maps" value="maps">
          <h1> Kartor </h1>
        </Tab>
      </Tabs>
    );
  }
});

var CompaniesTab = React.createClass({
  render: function() {
    return (<CHARMtabs value="companies" />);
  }
});

var MapsTab = React.createClass({
  render: function() {
    return (<CHARMtabs value="maps" />);
  }
});

var OtherTab = React.createClass({
  render: function() {
    return (<CHARMtabs value="other" />);
  }
});


var App = React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: getMuiTheme(CHARMtheme),
    };
  },

  render: function () {
    return (
        <div>
          {this.props.children}
        </div>
        );
  }
});

var Routes = React.createClass({
  render: () => {
    return (
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={CHARMtabs} />
            <Route path="/companies" component={CompaniesTab} />
            <Route path="/maps" component={MapsTab} />
            <Route path="/other" component={OtherTab} />
            <Route path="/company/:identifier" component={CompanyPage} />
          </Route>
        </Router>
        );
  }
});

ReactDOM.render(<Routes />, document.getElementById('root'));
