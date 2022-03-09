import * as yup from 'yup';

import { Button } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

AddToCardForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCardForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'Please enter at least 1.')
      .required('Please enter quantity')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log('Handle submit', values);
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="quantity" label="Số lượng" form={form} />

        <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
          Thêm vào giỏ hàng
        </Button>
      </form>
    </>
  );
}

export default AddToCardForm;
