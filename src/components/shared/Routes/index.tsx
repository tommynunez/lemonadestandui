import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import Landing from '../../landing';
import LemonadeStand from '../../lemonadestand';
import Confirmation from '../../lemonadestand/Confirmation';
import Management from '../../management';
import LemonadeType from '../../management/LemonadeType';
import LemonadeTypeDetail from '../../management/LemonadeType/LemonadeTypeDetail';
import Order from '../../management/Orders';
import ProductManagement from '../../management/ProductManagement';
import Size from '../../management/Size';
import Layout from '../Layout';
import ManagementLayout from '../Layout/ManagmentLayout';

const Routing = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <Landing />,
        },
        {
            path: "/storefront",
            element: <Layout element={<LemonadeStand />} />,
        },
        {
            path: "/management",
            element: <ManagementLayout element={<Management />}></ManagementLayout>,
        },
        {
            path: "/management/lemonadetype",
            element: <ManagementLayout element={<LemonadeType />}></ManagementLayout>,
        },
        {
            path: "/management/lemonadetype/details/:id",
            element: <ManagementLayout element={<LemonadeTypeDetail />}></ManagementLayout>,
        },
        {
            path: "/management/size",
            element: <ManagementLayout element={<Size />}></ManagementLayout>,
        },
        {
            path: "/management/product",
            element: <ManagementLayout element={<ProductManagement />}></ManagementLayout>,
        },
        {
            path: "/management/order",
            element: <ManagementLayout element={<Order />}></ManagementLayout>,
        },
    ]);

    return element;
}

export default Routing;