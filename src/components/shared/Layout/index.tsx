import { Container } from "@mui/material";
import Routing from "../Routes";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    return (
        <Container
            disableGutters={true}
            maxWidth={false}
        >
            <Header />
            <Container
            >
                <Routing />
            </Container>
            <Footer description={"Welcome to Lemonade Stand"} title={"Lemonade Stand"} />
        </Container>
    );
};

export default Layout;