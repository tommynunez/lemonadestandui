import { useRoutes } from 'react-router-dom';
import Landing from 'components/landing';
import LemonadeStand from 'components/lemonadestand';
import Confirmation from 'components/lemonadestand/Confirmation';
import Management from 'components/management';
import LemonadeType from 'components/management/LemonadeType';
import Orders from 'components/management/Orders';
import ProductManagement from 'components/management/ProductManagement';
import ProductManagementDetails from 'components/management/ProductManagement/ProductManagemenetDetails';
import Size from 'components/management/Size';
import SizeDetail from 'components/management/Size/SizeDetail';
import Layout from '../Layout';
import ManagementLayout from '../Layout/ManagmentLayout';
import LemonadeTypeDetail from 'components/management/LemonadeType/LemonadeTypeDetail';

const Routing = () => {
	const element = useRoutes([
		{
			path: '/',
			element: (
				<Layout disableGutters={true} maxWidth={false} element={<Landing />} />
			),
		},
		{
			path: '/storefront/confirmation/:id',
			element: <Layout disableGutters={false} element={<Confirmation />} />,
		},
		{
			path: '/storefront',
			element: <Layout disableGutters={false} element={<LemonadeStand />} />,
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
