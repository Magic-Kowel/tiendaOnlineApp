import { 
    Container,
    Grid,
    Typography,
    Box
} from "@mui/material";
import MenuWithoutSection from "../components/menu/MenuWithoutSection";
import ErrorIcon from '@mui/icons-material/Error';
import Footer from "../components/Footer";
function NotFound(){
    return(
        <>
            <Box
                sx={{
                    height: "84vh",
                    margin:0,
                    padding:0,
                    background: 'linear-gradient(90deg, rgba(255,0,155,1) 0%, rgba(136,84,222,1) 45%, rgba(0,212,255,1) 100%);'
                }}
            >
                <MenuWithoutSection />
                <Container maxWidth="xl">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item md={2} sm={12}>
                            <Box mt={20}
                                sx={{
                                    textAlign:"center"
                                }}
                            >
                                <ErrorIcon
                                    sx={{
                                        fontSize:"10rem"
                                    }}
                                />
                                <Typography
                                    component="h1"
                                    fontSize="10rem"
                                >
                                    404
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
}
export default NotFound;