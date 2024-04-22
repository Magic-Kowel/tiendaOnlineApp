
import ChartVisitProducts from "../components/chart/ChartVisitProducts";
import { Grid } from "@mui/material";
function Home(){
  return(
    <>
      <Grid container>
        <Grid item xs={12} smxs={12} md={6} lg={6} >
          <ChartVisitProducts />
        </Grid>
      </Grid>
    </>
  );
}
export default Home;