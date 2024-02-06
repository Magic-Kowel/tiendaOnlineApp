import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSize } from '../../reducers/size/size';
import {
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
    TextField,
    Button
} from '@mui/material';
import GoBack from '../../components/goBack';
import { useTranslation } from 'react-i18next';
import { colors, sizeTitle } from '../../stylesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { updateSize as updateSizeForm } from '../../reducers/size/size';
import Swal from 'sweetalert2';
function UpdateSize(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {sizes} = useSelector((state)=>state.size);
    const [t]=useTranslation("global");
    const [sizeForm, setSizeForm] = useState({
        idSize:'',
        nameSize:''
    });
    const params = useParams();
    const handleGetSize = async () =>{
        const { id } = params;
        await dispatch(getSize(id));
    }
    const handleUpdateSize = async (e) =>{
        e.preventDefault();
        if(sizeForm.nameSize.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        console.log(sizeForm);
        const response = await dispatch(updateSizeForm(sizeForm));
        if(response.payload.updated){
            Swal.fire({
                title:t("successfully-updated"),
                icon:'success',
                timer: 1500
            });
            navigate(-1);
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    useEffect(()=>{
        handleGetSize();
    },[])
    useEffect(()=>{
        setSizeForm({
            idSize: params.id,
            nameSize:sizes[0]?.nameSize
        });
    },[sizes])
    return(
        <>
            <Container>
                <Typography
                    sx={{
                        fontSize:sizeTitle,
                    }}
                    textAlign="center"
                    variant="h1"
                    gutterBottom
                >
                    {t("edit-category")}
                </Typography>
                <Card>
                    <CardContent onSubmit={handleUpdateSize} component="form">
                        <GoBack />
                            <Grid                
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                mt={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        value={sizeForm.nameSize}
                                        onChange={(e)=>{
                                            setSizeForm((prev)=>({
                                                ...prev,
                                                nameSize:e.target.value
                                            }))
                                        }}
                                        fullWidth
                                        label={t("size-clothe")} 
                                        variant="outlined" 
                                    />
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        sx={{
                                            backgroundColor:colors.primaryColor,
                                            '&:hover':{
                                                backgroundColor:colors.primaryColor
                                            }
                                        }}
                                    >
                                        {t("edit")}
                                    </Button>
                                </Grid>
                            </Grid>
        
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
export default UpdateSize;