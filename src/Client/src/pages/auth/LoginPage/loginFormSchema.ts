import * as Yup from 'yup';

export const loginFormSchema = Yup.object().shape({
    username: Yup.string().required('Username field is required'),
    hashedPassword: Yup.string().required('Password field is required')
})
