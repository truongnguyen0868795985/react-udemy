import { Box, Container, Grid, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import { makeStyles } from '@material-ui/styles';
import productApi from 'api/productApi';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
}));
function ListPage(props) {
  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await productApi.getAll({ _page: 1, _limit: 10 });
        console.log('Products:', data);
        setProductList(data);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevator={0}>Left column</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevator={0}>{loading ? <ProductSkeletonList /> : <ProductList data={productList} />}</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
