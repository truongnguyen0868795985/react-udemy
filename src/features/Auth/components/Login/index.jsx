import LoginForm from '../LoginForm';
import { PropTypes } from 'prop-types';
import { login } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
// import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      console.log('Form submit:', values);
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (err) {
      console.log('Fail to sign in', err);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

Login.propTypes = {
  closeDialog: PropTypes.func,
};

export default Login;
