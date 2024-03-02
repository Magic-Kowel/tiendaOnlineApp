import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function ProductCard({dataProduct}){
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
    return(
    
        <Box>
            {dataProduct.map((product, index) => {
                const maxSteps = product.urlImagenes.split(',').length;
                return (
                    <Card sx={{ maxWidth: 200 }} key={index}>
                        <Box key={index} sx={{ maxWidth: 200, flexGrow: 1 }}>
                            <AutoPlaySwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                                interval={5000}
                            >
                                {product.urlImagenes.split(',').map((step, stepIndex) => (
                                    <div key={stepIndex}>
                                        {Math.abs(activeStep - stepIndex) <= 2 ? (
                                            <Box
                                                component="img"
                                                sx={{
                                                    display: 'block',
                                                    maxWidth: 200,
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
                        <CardContent>
                            <Typography variant="h6" component="div" gutterBottom>
                                {product.nameProduct}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Material: {product.nameMaterial}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                );
            })}
        </Box>

    )
}
ProductCard.propTypes = {
    dataProduct: PropTypes.array.isRequired,
};
export default ProductCard;