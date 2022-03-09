import { Route, Switch } from 'react-router-dom';

import AlbumFeature from './features/Album/pages';
import Header from 'components/Header';
import ProductFeature from 'features/Product';
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

      <Switch>
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  );
}

export default App;
