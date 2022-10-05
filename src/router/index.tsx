import React,{ ReactNode, lazy } from "react";

const Login = lazy(()=> import("../pages/login"))
const GlobalIndex = lazy(()=> import("../pages/index"))

export interface IRoute {
    exact?: boolean
    path: string
    title: string
    icon?: ReactNode
    component?: ReactNode
    children?: IRoute
}

export const routes: IRoute[] = [
    {
        path:'/login',
        title:'登录页',
        component: <Login />
    },
    {
        path:'/index',
        title:'首页',
        component: <GlobalIndex />
    }
]