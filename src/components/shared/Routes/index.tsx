import { useRoutes } from 'react-router-dom';
import Landing from '../../lemonadestand/Landing';
import Confirmation from '../../lemonadestand/Confirmation';

const Routing = () => {
    let element = useRoutes([
        {
            path: "/",
            element: <Landing />,
        },
        {
            path: "confirmation",
            element: <Confirmation />,
        },
    ]);

    return element;
}

export default Routing;