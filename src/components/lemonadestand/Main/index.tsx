import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { StyledMarkDown } from './index.styles';

interface MainProps {
    posts: ReadonlyArray<any>;
    title: string;
}

export default function Main(props: MainProps) {
    const { posts, title } = props;

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                '& .markdown': {
                    py: 3,
                },
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Divider />
            <StyledMarkDown className="markdown">
            </StyledMarkDown>
        </Grid>
    );
}