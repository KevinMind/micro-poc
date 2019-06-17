import React from 'react';
import ReactDOM from 'react-dom';
import { get } from 'lodash';

import ReactApple from './ReactApple';

const render = App => {
  const target = get(global, '__MF__.apple', 'root');
  const el = document.getElementById(target);
  ReactDOM.render(<App />, el);
};

render(ReactApple);

if (module.hot) {
  module.hot.accept();
}
