import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProduct,getProducts } from '../reducers/product/product';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function ProductCard({product}){
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    const handleUpdate = (id) =>{
        navigate(`edit/${id}`);
    }
    const handleDeleteProduct = async (id) =>{
        Swal.fire({
            title: t("want-to-delete-material"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
        }).then((result) => {
            console.log(3);
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        dispatch(getProducts());
                        return false;
                    }
                    Swal.fire({
                        title:t("something-went-wrong"),
                        icon:"error"
                    });
                })
            }
        });
    }
    const maxSteps = product?.urlImagenes?.split(',').length;
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} key={product.idProduct}>
            <Box sx={{ flexGrow: 1 }}>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    interval={5000}
                >
                    {product?.urlImagenes?.split(',')?.map((step, stepIndex) => (
                        <div key={stepIndex}>
                            {Math.abs(activeStep - stepIndex) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={step}
                                    alt={`Step ${stepIndex}`}
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    {product.nameProduct}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Material: {product.nameMaterial}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid 
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item container justifyContent="flex-end" xs={4.5}>
                        <Tooltip title={t("edit")}>
                            <IconButton 
                                color="warning"
                                onClick={()=>handleUpdate(product.idProduct)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item container xs={4.5}>
                        <Tooltip title={t("delete")}>
                            <IconButton 
                                color='error'
                                onClick={()=>handleDeleteProduct(product.idProduct)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};
export default ProductCard;