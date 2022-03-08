import { Route, Switch } from 'react-router-dom';

import AlbumFeature from './features/Album/pages';
import { Button } from '@material-ui/core';
import Header from 'components/Header';
import TodoFeature from './features/Todo/pages';
import productApi from './api/productApi';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

function App() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };

      const productList = await productApi.getAll(params);
      console.log(productList);
    };

    fetchProducts();
  }, []);

  const showNoti = () => {
    enqueueSnackbar('hihi', { variant: 'success' });
  };

  return (
    <div className="App">
      <Header />

      <Button onClick={showNoti}>Show noti</Button>

      <Switch>
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
      </Switch>

      <p>Footer</p>
    </div>
  );
}

export default App;
