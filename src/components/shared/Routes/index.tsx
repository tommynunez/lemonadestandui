import { useRoutes } from 'react-router-dom';
import Landing from 'src/components/landing';
import LemonadeStand from 'src/components/lemonadestand';
import Confirmation from 'src/components/lemonadestand/Confirmation';
import Management from 'src/components/management';
import LemonadeType from 'src/components/management/LemonadeType';
import Orders from 'src/components/management/Orders';
import ProductManagement from 'src/components/management/ProductManagement';
import ProductManagementDetails from 'src/components/management/ProductManagement/ProductManagemenetDetails';
import Size from 'src/components/management/Size';
import SizeDetail from 'src/components/management/Size/SizeDetail';
import Layout from '../Layout';
import ManagementLayout from '../Layout/ManagmentLayout';
import LemonadeTypeDetail from 'src/components/management/LemonadeType/LemonadeTypeDetail';

const Routing = () => {
	const element = useRoutes([
		{
			path: '/',
			element: <Layout element={<Landing />} />,
		},
		{
			path: '/storefront/confirmation/:id',
			element: <Layout element={<Confirmation />} />,
		},
		{
			path: '/storefront',
			element: <Layout element={<LemonadeStand />} />,
		},
		{
			path: '/management',
			element: <ManagementLayout element={<Management />}></ManagementLayout>,
		},
		{
			path: '/management/lemonadetype',
			element: (
				<ManagementLayout index element={<LemonadeType />}></ManagementLayout>
			),
		},
		{
			path: '/management/lemonadetype/details/:id',
			element: (
				<ManagementLayout element={<LemonadeTypeDetail />}></ManagementLayout>
			),
		},
		{
			path: '/management/size',
			element: <ManagementLayout element={<Size />}></ManagementLayout>,
		},
		{
			path: '/management/size/details/:id',
			element: <ManagementLayout element={<SizeDetail />}></ManagementLayout>,
		},
		{
			path: '/management/product',
			element: (
				<ManagementLayout element={<ProductManagement />}></ManagementLayout>
			),
		},
		{
			path: '/management/product/details/:id',
			element: (
				<ManagementLayout
					element={<ProductManagementDetails />}></ManagementLayout>
			),
		},
		{
			path: '/management/order',
			element: <ManagementLayout element={<Orders />}></ManagementLayout>,
		},
	]);

	return element;
};

export default Routing;
