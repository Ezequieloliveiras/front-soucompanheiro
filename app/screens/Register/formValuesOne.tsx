import * as yup from 'yup'

const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',

}

const validationSchema = yup.object().shape({

    fullName: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
    confirmPassword: yup.string().required('Campo obrigatório'),
})

export {
    initialValues,
    validationSchema,
}