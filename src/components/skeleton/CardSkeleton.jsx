import { 
    Card,
    CardContent,
    CardActions,
    Box,
    Skeleton
} from "@mui/material";
function CardSkeleton(){
    return(
        <>
            <Card sx={{ height: '22rem' }}>
                <Box >
                    <Skeleton variant="rectangular" width='100%' height="10rem" />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </CardContent>
                <CardActions>
                    <Skeleton width="100%" />
                </CardActions>
            </Card>
        </>
    )
}
export default CardSkeleton;