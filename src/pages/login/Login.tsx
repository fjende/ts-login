import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from './validation';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import config from '../../config/config';
import { ILoginForm, IFormStatus} from '../../interfaces/login';
import FormikTextField from './components/FormikTextField'
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    errorMessage: { color: 'red' },
}));

export default function Login(props: any) {

    const classes = useStyles();
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: ''
    })
    const [showError, setShowError] = useState(false)

    useEffect(() => {
    if (sessionStorage.getItem('loggedIn')) {
        props.history.push('/home');
    }
    });

    return (    
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Formik
                    initialValues={{ 
                        email: '', 
                        password: ''
                    }}
                    onSubmit={(values: ILoginForm, formikBag) => {
                    axios
                        .post(`${config.api.login}`, {
                        username: values.email,
                        password: values.password
                        })
                        .then(response => {
                        console.log(response)
                        setShowError(false)
                        })
                        .catch(error => { 
                        setFormStatus(error)
                        setShowError(true)
                        })
                        .finally(() => formikBag.resetForm());
                    }}
                    validationSchema={loginValidationSchema}
                >
                    <Form>
                        <FormikTextField formikKey="email" variant="outlined" label="Email" autoFocus className={classes.form}/>
                        <FormikTextField formikKey="password" variant="outlined" label="Password" className={classes.form}/>
                        <Button type="submit" fullWidth variant="outlined" color="primary" className={classes.submit}>
                            Login
                        </Button>
                        {showError ? 
                        (<Alert severity="error">
                            <AlertTitle><strong>Error</strong></AlertTitle>
                            {formStatus.message}
                        </Alert>) : null }
                    </Form>
                </Formik>
            </div>
        </Container>
    );
}