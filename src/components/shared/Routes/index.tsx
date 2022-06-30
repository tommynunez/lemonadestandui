import { useRoutes } from 'react-router-dom';
import Home from '../../lemonadestand/Home';
import Landing from '../../lemonadestand/Landing';
import Confirmation from '../../lemonadestand/Confirmation';

const Routing = () => {
    let element = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "lemonadestand",
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