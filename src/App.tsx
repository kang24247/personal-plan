import React,{ ReactNode } from 'react';
import './App.less';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { routes } from './router'
import NotFound from "@/pages/NotFound";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path='*' element={<NotFound />} />
            {routes.map(function (route,index):ReactNode {
                return <Route path={route.path} element={route.component} key={route.title+index}></Route>
            })}
        </Routes>
    </BrowserRouter>
);

export default App;
