import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import CHARMtheme from './theme';

// Needed for onTouchTap
// Can go away when react 1.0 release
injectTapEventPlugin();


var App = React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(CHARMtheme),
    };
  },

  render: function () {
    return (
        <Tabs>
          <Tab icon={<FontIcon className="muidocs-icon-action-home" />} />
          <Tab label="Companies">
            <h1> Företag </h1>
            Här ska det va företag.
            </Tab>
          <Tab label="Maps">
            <h1> Kartor </h1>
          </Tab>
        </Tabs>
        );
  }});

ReactDOM.render(<App />, document.getElementById('root'));
