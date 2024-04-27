
import ChartVisitProducts from "../components/chart/ChartVisitProducts";
import ChartTopVisitProducts from "../components/chart/ChartTopVisitProducts";
import { Grid } from "@mui/material";
function Home(){
  return(
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <ChartVisitProducts />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
           <ChartTopVisitProducts />
        </Grid>
      </Grid>
    </>
  );
}
export default Home;