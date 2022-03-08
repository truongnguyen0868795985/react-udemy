import { PropTypes } from 'prop-types';
import RegisterForm from '../RegisterForm';
import { register } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
// import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;
      console.log('Form submit:', values);
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      enqueueSnackbar('Register successfully!', { variant: 'success' });

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (err) {
      console.log('Fail to register', err);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
}

Register.propTypes = {
  closeDialog: PropTypes.func,
};

export default Register;
