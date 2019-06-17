import React from 'react';
import ReactDOM from 'react-dom';
import { get } from 'lodash';

import ReactOrange from './ReactOrange';

const render = App => {
  const target = get(global, '__MF__.orange', 'root');
  const el = document.getElementById(target);
  ReactDOM.render(<App />, el);
};

render(ReactOrange);

if (module.hot) {
  module.hot.accept();
}
