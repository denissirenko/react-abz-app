import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is a required field')
    .min(2, 'Too Short!')
    .max(60, 'Too Long!'),
  email: yup
    .string()
    .trim()
    .required('Email is a required field')
    .matches(
      //eslint-disable-next-line
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      'Email should have correct format',
    ),
  phone: yup
    .string()
    .trim()
    .min(13, 'Too Short!')
    .required('Phone is a required field')
    //eslint-disable-next-line
    .matches(/^[\+]{0,1}380([0-9]{9})$/, 'Phone should have correct format'),
  position_id: yup.number().typeError('Selected position').required(),
  photo: yup
    .mixed()
    .required('You need add file')
    .test('type', 'Only formats: .jpeg, .jpg', (value) => {
      return value && value[0]?.type === 'image/jpeg';
    })
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0]?.size <= 5000000;
    }),
});
