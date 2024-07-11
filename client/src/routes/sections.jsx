import {lazy, Suspense} from 'react';
import {Navigate, Outlet, useRoutes} from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import PrivateRoute from '../sections/privateRouter';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ProjectsLoadPage = lazy(() => import('src/pages/projects'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LoginView = lazy(() => import('src/sections/Login/login-view'));
export const Signup = lazy(() => import('src/sections/Login/signup'));
export const VerificationPage = lazy(() => import('src/sections/Login/verification_page'));
export const EmailConfirmationPage = lazy(() => import('src/sections/Login/confirm-email-page'));
export const ForgotPassword = lazy(() => import('src/sections/Login/ForgotPassword'));
export const ResetPassword = lazy(() => import('src/sections/Login/reset_password'));

export default function Router() {
    return useRoutes([
        {
            element: (
                <DashboardLayout>
                    <Suspense>
                        <PrivateRoute>
                            <Outlet/>
                        </PrivateRoute>
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                {path: '/', element: <IndexPage/>, index: true},
                {path: 'projects', element: <ProjectsLoadPage/>},
            ],
        },
        {
            path: 'login',
            element: <LoginView/>,

        }, {
            path: 'verification',
            element: <VerificationPage/>,

        }, {
            path: 'confirm_email',
            element: <EmailConfirmationPage/>,
        },
        {
            path: 'signup',
            element: <Signup/>,
        }, {
            path: 'forgot_password',
            element: <ForgotPassword/>,
        },
        {
            path: 'reset_password',
            element: <ResetPassword/>,
        },
        {
            path: '404',
            element: <Page404/>,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
