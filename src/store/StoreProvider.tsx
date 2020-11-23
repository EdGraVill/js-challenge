import * as React from 'react';
import { createStore } from './createStore';
import { Provider } from 'react-redux';

const StoreProvider: React.FC = ({ children }) => {
  const store = React.useMemo(() => createStore(), []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
