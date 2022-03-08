import Header from 'components/Header';
import { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import AlbumFeature from './features/Album/pages';
import TodoFeature from './features/Todo/pages';

function App() {
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

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
      </Switch>

      <p>Footer</p>
    </div>
  );
}

export default App;
