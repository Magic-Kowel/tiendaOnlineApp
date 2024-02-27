import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
        sx={{
            backgroundColor:"#000",
            p:6,
            flexShrink: 0
        }}
        component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="white" align="center">
            {"Creado por: "}
            <Link 
                underline="none" 
                color="inherit" 
                href="https://josuefierromorfin.netlify.app/"
            >
                Josue Morfin
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
      </Container>
    </Box>
  );
}