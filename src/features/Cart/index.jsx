import { cartTotalSelector } from './selectors';
import { useSelector } from 'react-redux';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  return <div>{cartTotal}</div>;
}

export default CartFeature;
