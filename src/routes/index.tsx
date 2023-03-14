import React from 'react'
const Home = React.lazy(() => import('../pages/home'))
const LoopForm = React.lazy(() => import('../pages/form/loopForm'))
const Inherit = React.lazy(() => import('../pages/components/inherit'))
const Table = React.lazy(() => import('../pages/components/table'))
const Skill = React.lazy(() => import('../pages/skill'))


const routes = [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/form',
        element: <LoopForm />,
        children: [
            {
                path: 'loopForm',
                element: <LoopForm />
            }
        ]
    },
    {
        path: '/components',
        element: <Inherit />,
        children: [
            {
                path: 'inherit',
                element: <Inherit />
            },
            {
                path: 'table',
                element: <Table />
            },
        ]
    },
    {
        path: '/skill',
        element: <Skill />
    },
]

export default routes