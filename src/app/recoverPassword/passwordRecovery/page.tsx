import React from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
    password: string;
    verifyPassword: string;
}

const PasswordRecovery: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Password Recovery</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        {...register('password', { required: 'Ingrese una contraseña valida' })}
                                    />
                                    {errors.password && <div className="text-error">{errors.password.message}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        {...register('verifyPassword', { required: 'password is required' })}
                                    />
                                    {errors.password && <div className="text-error">{errors.password.message}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Recuperar contraseña</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordRecovery;