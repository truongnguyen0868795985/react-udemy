import { Box, makeStyles } from '@material-ui/core';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: theme.spacing(2, 4),
    },
    '& > li > a': {
      color: theme.palette.grey[700],
    },
    '& > li > a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

function ProductMenu(props) {
  const { url } = useRouteMatch();
  console.log('url', url);
  const classes = useStyles();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <NavLink to={url} exact>
          Description
        </NavLink>
      </li>
      <li>
        <NavLink to={`${url}/additional`} exact>
          Additional information
        </NavLink>
      </li>
      <li>
        <NavLink to={`${url}/reviews`} exact>
          Reviews
        </NavLink>
      </li>
    </Box>
  );
}

export default ProductMenu;
