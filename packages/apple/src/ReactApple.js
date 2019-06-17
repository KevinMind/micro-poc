import React from 'react';
import cn from 'classnames/bind';

import styles from './style.scss';

const cx = cn.bind(styles);

const ReactApple = () => {
  return (
    <button onClick={() => alert('apppppppplllles')} className={cx('button')}>
      APPLE
    </button>
  );
};

export default ReactApple;
