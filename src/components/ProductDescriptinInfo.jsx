import { Stack,Skeleton } from "@mui/material";
function ProductDescriptinInfo(){
    return(
        <>
            <Stack spacing={2} justifyContent="start" direction={{ xs: "column", md: "column" }}>
                {Array.from({ length: 8 }, (_, index) => (
                    <Skeleton key={index} variant="text" sx={{ fontSize: '2rem' }} />
                ))}
            </Stack>
        </>
    )
}
export default ProductDescriptinInfo;