import {createBrowserRouter, Navigate } from "react-router-dom"
import SignIn from "../pages/signin/Index"
import SignUp from "../pages/signup/Index"
import Layout from "../pages/shared/Layout"
import ProtectedRoute from "../pages/shared/ProtectedRoute"
import Dashboard from "../pages/dashboard/Index"
import Projects from "../pages/projects/displayProjects/Index"
import Members from "../pages/members/Index"
import ProjectDetails from "../pages/projectdetails/Index"
import NewTask from "../pages/tasks/NewTask"

const router = createBrowserRouter([
    {
        path : '/',
        element : <Navigate to = '/account/projects' />
    },
    {
        path : '/signin',
        element : <SignIn />
    },
    {
        path : '/signup',
        element : <SignUp />
    },
    {
        path : '/account',
        element : <ProtectedRoute><Layout /></ProtectedRoute>,
        children : [
            {
                index : true,
                element : <Navigate to = 'projects' />,
            },
            {
                path : 'dashboard',
                element : <Dashboard />
            },
            {
                path : 'projects',
                children : [
                    {
                        index : true,
                        element : <Projects />
                    },
                    {
                        path : ':projectID',
                        element : <ProjectDetails />,
                        children : [
                            {
                                path : 'tasks',
                                children : [
                                    {
                                        index : true,
                                        element : <>tasks</>
                                    },
                                    {
                                        path : 'newtask',
                                        element : <NewTask />
                                    },
                                    {
                                        path : ':taskid',
                                        element : <>taskid</>
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                path : 'members',
                element : <Members />,
            }
        ]
    },
]);

export default router
