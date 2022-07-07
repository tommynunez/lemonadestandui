import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import Landing from '../../landing';
import LemonadeStand from '../../lemonadestand';
import Confirmation from '../../lemonadestand/Confirmation';
import Management from '../../management';
import LemonadeType from '../../management/LemonadeType';
import LemonadeTypeDetail from '../../management/LemonadeType/LemonadeTypeDetail';
import Orders from '../../management/Orders';
import ProductManagement from '../../management/ProductManagement';
import ProductManagementDetails from '../../management/ProductManagement/ProductManagemenetDetails';
import Size from '../../management/Size';
import SizeDetail from '../../management/Size/SizeDetail';
import Layout from '../Layout';
import ManagementLayout from '../Layout/ManagmentLayout';

const Routing = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <Layout element={<Landing />} />,
        },
        {
            path: "/storefront/confirmation",
            element: <Layout element={<Confirmation />} />,
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
            element: <ManagementLayout index element={<LemonadeType />}></ManagementLayout>,
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
            path: "/management/size/details/:id",
            element: <ManagementLayout element={<SizeDetail />}></ManagementLayout>,
        },
        {
            path: "/management/product",
            element: <ManagementLayout element={<ProductManagement />}></ManagementLayout>,
        },
        {
            path: "/management/product/details/:id",
            element: <ManagementLayout element={<ProductManagementDetails />}></ManagementLayout>,
        },
        {
            path: "/management/order",
            element: <ManagementLayout element={<Orders />}></ManagementLayout>,
        },
    ]);

    return element;
}

export default Routing;