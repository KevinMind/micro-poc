import React from 'react';
import ReactDOM from 'react-dom';

const ReactApple = () => {
  return (
    <div>
      APPLE
    </div>
  );
};

const render = App => ReactDOM.render(React.createElement(App), document.getElementById('app'));

render(ReactApple);

// class Apple extends HTMLElement {
//   connectedCallback() {
//     const mountPoint = document.createElement('span');
//     this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
//     ReactDOM.render(<ReactApple />, mountPoint);
//   }
// }
//
// customElements.define('custom-apple', ReactApple);
//
// export default Apple;
