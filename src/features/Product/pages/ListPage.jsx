import { Box, Container, Grid, Paper } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import FilterViewer from '../components/FilterViewer';
import { Pagination } from '@material-ui/lab';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import { makeStyles } from '@material-ui/styles';
import productApi from 'api/productApi';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'end',
    padding: '16px 0',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  console.log('query params', queryParams);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 9,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        console.log(pagination);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = { ...queryParams, _page: page };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterChange = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = { ...queryParams, _sort: newSortValue, _page: 1 };
    console.log('new filter', filters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  console.log('curentSort', queryParams._sort);

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevator={0}>
              <ProductFilters filters={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevator={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={handleFilterChange} />

              {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
