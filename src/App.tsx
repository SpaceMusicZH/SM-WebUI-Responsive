import React from 'react';
import './App.css';
import ConnectionDialog from './ConnectionDialog';
import { VERSION_STR } from './Globals';
import { rcpLogVersion } from 'rabbitcontrol';


/*
  use with local tcp-ts:
  $ npm link ../rcp-ts
  $ npm install path-to-file

  unlink with:
  $ npm unlink rabbitcontrol
  $ npm install
*/

/**
 * problems with carbon:
 * 
 * - no RangeSlider
 * - nested accordion: folding does not work
 * - use colors from theme
 */


interface Props {
};

interface State {
  height: number;
};

class App extends React.Component<Props, State>
{
  static PROTOCOL_SWITCH_KEY = "__psw";

  static VERBOSE_LOG = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      height: window.innerHeight,
    };

    console.log(`rabbitcontrol web client - version: ${VERSION_STR}`);
  }

  componentDidMount() 
  {
    if (window.location.protocol.startsWith("https"))
    {
      // NOTE: using unsecure websocket connection in secure context (https) is not allowed.
      // try to switch to http

      // check if PROTOCOL_SWITCH_KEY is already present
      // only try once!
      const params = new URLSearchParams(window.location.search);
      if (!params.has(App.PROTOCOL_SWITCH_KEY))
      {
        // switch protocol
        params.set(App.PROTOCOL_SWITCH_KEY, "1");
        window.location.href = "http://" + window.location.host + window.location.pathname + "?" + params.toString() + window.location.hash;
        return;
      }
      else
      {
        console.error("Switch to http:// did not succeed. Connections may fail.");
        alert("Switch to http:// did not succeed. Connections may fail.");
      }
    }

    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() 
  {
    rcpLogVersion();
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => 
  {
    this.setState({ height: window.innerHeight });
  }

  render() {

    return (
      <div className="App"
        style={{
          minHeight: this.state.height - 40
        }}>

        <ConnectionDialog />

        <div style={{
          flex: 2
        }}></div>

      </div>
    );
  }
}

export default App;
