import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Container,
    Box,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
    Chip,
    Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import imagenNotFound from "../../assets/img/imagenNotFound.svg"
import { useTranslation } from 'react-i18next';
import { useDispatch,useSelector } from "react-redux";
import { getProductDescription, getProductImagens, registerVisitProduct } from '../../reducers/product/product';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import DescriptionIcon from '@mui/icons-material/Description';
import { FaTshirt } from "react-icons/fa";
import { IoMdResize } from "react-icons/io";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FaceIcon from '@mui/icons-material/Face';
import Footer from '../../components/Footer';
import GoBack from '../../components/goBack';
import { colors } from '../../stylesConfig';
import MenuWithoutSection from '../../components/menu/MenuWithoutSection';
import Seo from '../../components/Seo';
import productDescriptionSeo from '../../tools/seo/productDescriptionSeo';
import TitlePage from '../../components/TitlePage';
import ProductDescriptinInfo from '../../components/ProductDescriptinInfo';
import WhatsAppButton from '../../components/WhatsAppButton';
import ErrorIcon from '@mui/icons-material/Error';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function ProductDescription(){
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [t] = useTranslation("global");
    const params = useParams();
    const dispatch = useDispatch();
    const {products,imagensProduct, loadingProducts} = useSelector((state)=>state.product)
    const isLogin = sessionStorage.getItem("token")

    const {idProduct} = params;
    useEffect(()=>{
        dispatch(getProductDescription(idProduct));
        dispatch(getProductImagens(idProduct));
        dispatch(registerVisitProduct({idProduct}))
    },[ ]);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    const [product,setProduct] = useState({
        idProduct:idProduct,
        nameProduct:"",
        category:"",
        material:"",
        subcategory:"",
        gender:"",
        description:"",
    });
    const [sizes,setSizes] = useState({
        price:"",
        stock:"",
        minAge:"",
        maxAge:"",
        size:"",
        namesize:"",
        public:""
    });
    const handleChangeSize = (size) =>{
        setSizes(size)
    }
    const maxSteps = imagensProduct.length;
    useEffect(()=>{
        if(products.length > 0){
            setProduct((prev)=>({
                ...prev,
                nameProduct:products[0].nameProduct,
                description:products[0].description,
                category:products[0].category,
                material:products[0].material,
                subcategory:products[0].subcategory,
                gender:products[0].gender,
                ageGroup:products[0].ageGroup,
                sizes:products,
                listImagenes:imagensProduct
            }));
            if(!!products.length && !!imagensProduct.length){
                productDescriptionSeo({
                    title:products[0].nameProduct,
                    description:products[0].description,
                    img:imagensProduct[0].imagen
                })
            }
            setSizes(products.find((item)=>item.main));
           
        }
    },[products,imagensProduct]);
    return(
        <>
            <Seo />
            {
                Boolean(!isLogin) &&(
                    <MenuWithoutSection />
                )
            }
            <Container sx={{minHeight: "100vh"}}>
            <GoBack />
                <Card elevation={3}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <Box sx={{ flexGrow: 1 }}>
                                    <AutoPlaySwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        onChangeIndex={handleStepChange}
                                        enableMouseEvents
                                        interval={5000}
                                    >
                                        {
                                            imagensProduct.length ?(
                                                imagensProduct?.map((step, stepIndex) => (
                                                    <div key={stepIndex}>
                                                        {Math.abs(activeStep - stepIndex) <= 2 ? (
                                                            <Box
                                                                component="img"
                                                                sx={{
                                                                    display: 'block',
                                                                    overflow: 'hidden',
                                                                    width: '100%',
                                                                    height:"auto",
                                                                    objectFit:"cover"
                                                                }}
                                                                src={step.imagen}
                                                                alt={`Step ${stepIndex}`}
                                                            />
                                                        ) : null}
                                                    </div>
                                                ))

                                            ):( 
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        display: 'block',
                                                        overflow: 'hidden',
                                                        width: '100%',
                                                    }}
                                                    src={imagenNotFound}
                                                    alt={`imagen not found`}
                                                />
                                            )
                                        }
                                    </AutoPlaySwipeableViews>
                                    {
                                        imagensProduct.length > 1 &&(
                                            <MobileStepper
                                                steps={maxSteps || 0}
                                                position="static"
                                                activeStep={activeStep}
                                                sx={{
                                                    '& .MuiMobileStepper-dotActive': {
                                                      backgroundColor: colors.primaryColor, // Cambia el color de fondo del punto activo
                                                    },
                                                }}
                                                nextButton={
                                                    <Button
                                                        size="small"
                                                        onClick={ handleNext}
                                                        disabled={activeStep === maxSteps - 1}
                                                        sx={{color:colors.primaryColor}}
                                                    >
                                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                                    </Button>
                                                }
                                                backButton={
                                                    <Button 
                                                        size="small" 
                                                        onClick={handleBack} 
                                                        disabled={activeStep === 0}
                                                        sx={{color:colors.primaryColor}}
                                                    >
                                                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                    </Button>
                                                }
                                            />
                                        )
                                    }
                                </Box>
                            </Grid>
                            <Grid container item flexDirection="row" xs={12} sm={12} md={6} lg={6}>
                                <Grid item xs={12} marginTop={5}>
                                    <TitlePage 
                                        title={product?.nameProduct}
                                    />
                                </Grid>
                                <Grid container item xs={12} sx={{ 
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                    {
                                        !loadingProducts && (
                                            <>
                                                {
                                                    !products.length ? (
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
                                                    ):(
                                                        <>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip icon={<DescriptionIcon />} label={t("description")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {product?.description}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip  icon={<FaTshirt />} label={t("category")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {product?.category}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip icon={<FaTshirt />} label={t("clothes")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {product?.subcategory}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip icon={<CheckroomIcon />} label={t("material")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {product?.material}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip icon={ 
                                                                    product?.gender ==="Femenino" 
                                                                    ? <FemaleIcon />:
                                                                    <MaleIcon />
                                                                } label={t("gender")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {product?.gender}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip icon={ 
                                                                    sizes?.public ==="Infantil" 
                                                                    ? <ChildCareIcon />:
                                                                    <FaceIcon />
                                                                } label={t("public")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {sizes?.public}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip icon={<AttachMoneyIcon />} label={t("price")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {sizes?.price}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack 
                                                                spacing={2}
                                                                justifyContent="start"
                                                                direction={{xs:"column", md:"colum"}}
                                                            >
                                                                <Chip icon={<IoMdResize />} label={t("size-clothe")} />
                                                                <Typography 
                                                                    variant="h6" 
                                                                    component="p"
                                                                    textAlign="center"
                                                                    sx={{textTransform:"capitalize"}}
                                                                >
                                                                    {sizes?.namesize} {sizes?.minAge && sizes?.maxAge ? `${sizes?.minAge} - ${sizes?.maxAge}` : sizes?.size}
                                                                </Typography>
                                                            </Stack>
                                                            {
                                                                loadingProducts && (
                                                                    <ProductDescriptinInfo />
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </Grid>
                                {!!products.length && (
                                    <>
                                        <Grid container spacing={1} item mt={{xs:5, md:0}} xs={12} justifyContent="center">
                                            {
                                                products?.map((item,index)=>(
                                                    <Grid item key={index}>
                                                        <Button
                                                            onClick={()=>handleChangeSize(item)}
                                                            variant="outlined"
                                                            sx={{
                                                                color:colors.primaryColor,
                                                                borderColor:colors.primaryColor,
                                                                '&:hover':{
                                                                    borderColor:colors.primaryColor
                                                                }
                                                            }}
                                                        >   
                                                            {`${item?.public} ${item.namesize}`}
                                                        </Button>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                        <Grid container spacing={1} item mt={{xs:5, md:1}} xs={12} justifyContent="center">
                                            <WhatsAppButton />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </>
    )
}
export default ProductDescription;