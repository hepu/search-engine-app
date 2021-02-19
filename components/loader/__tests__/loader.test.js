import React from 'react';
import { shallow } from 'enzyme';

import Loader from '../loader';

describe('Loader tests', () => {
  const FullLoader = <Loader />;
  const fullLoader = shallow(FullLoader);

  it('renders an <img> tag', () => {
    expect(fullLoader.find('img')).not.toBe(null);
  });
});
