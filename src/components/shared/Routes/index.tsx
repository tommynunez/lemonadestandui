import { useRoutes } from 'react-router-dom';
import Landing from '../../landing';
import LemonadeStand from '../../lemonadestand';
import Confirmation from '../../lemonadestand/Confirmation';

const Routing = () => {
    let element = useRoutes([
        {
            path: "/",
            element: <Landing />,
        },
        {
            path: "/lemonadestand",
            element: <LemonadeStand />,
        },
        {
            path: "/confirmation",
            element: <Confirmation />,
        },
    ]);

    return element;
}

export default Routing;