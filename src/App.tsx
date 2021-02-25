import React from 'react';

function App(props: any) {

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default App;