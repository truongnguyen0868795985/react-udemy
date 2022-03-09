import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Box } from '@material-ui/core';
import ListPage from './pages/ListPage';

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage}></Route>
      </Switch>
    </Box>
  );
}

ProductFeature.propTypes = {};

export default ProductFeature;
