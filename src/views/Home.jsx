
import ChartVisitProducts from "../components/chart/ChartVisitProducts";
import ChartTopVisitProducts from "../components/chart/ChartTopVisitProducts";
import { Grid } from "@mui/material";
function Home(){
  return(
    <>
      <Grid
      container 
      justifyContent="center"
      alignItems="stretch">
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <ChartVisitProducts />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
           <ChartTopVisitProducts />
        </Grid>
      </Grid>
    </>
  );
}
export default Home;