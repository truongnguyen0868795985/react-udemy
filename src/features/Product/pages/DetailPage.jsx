import { Box, Container, Grid, LinearProgress, Paper, makeStyles } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import AddToCardForm from '../components/AddToCardForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReview from '../components/ProductReview';
import ProductThumbnail from '../components/ProductThumbnail';
import { addToCart } from 'features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

DetailPage.propTypes = {};

function DetailPage(props) {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const dispatch = useDispatch();

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCardSubmit = ({ quantity }) => {
    console.log('FOrm value', quantity);

    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });

    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCardForm onSubmit={handleAddToCardSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route exact path={`${url}/additional`} component={ProductAdditional} />
          <Route exact path={`${url}/reviews`} component={ProductReview} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
