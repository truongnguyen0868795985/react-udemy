import { Box, Grid } from '@material-ui/core';

import PropTypes from 'prop-types';
import { Skeleton } from '@material-ui/lab';

function ProductSkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
  length: 6,
};

export default ProductSkeletonList;
