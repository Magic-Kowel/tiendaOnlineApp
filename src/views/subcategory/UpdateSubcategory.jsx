import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { colors, sizeTitle } from '../../stylesConfig';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getSubcategory, updateSubcategory } from '../../reducers/subCategory/subCategory';
import Swal from 'sweetalert2';
function UpdateSubcategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [t]=useTranslation("global");
    const [subcategory,setSubcategory]= useState({
        id:"",
        name:""
    });
    const handleGetCategory = async () =>{
        const response = await dispatch(getSubcategory(params.idSubcategory));
        setSubcategory({
            id:response.payload[0].id,
            name:response.payload[0].name
        })
    }
    const handleUpdateSubcategory = async (e) =>{
        e.preventDefault();
        if(subcategory.name.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(updateSubcategory(subcategory));
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
        handleGetCategory();
    },[])
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
                    {t("edit-subcategory")}
                </Typography>
                <Card>
                    <CardContent>
                        <GoBack />
                        <form
                            onSubmit={handleUpdateSubcategory}
                            autoComplete="off"
                        >
                            <Grid                
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            mt={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={subcategory.name}
                                        label={t("name")}
                                        variant="outlined"
                                        onChange={(e)=>{
                                            setSubcategory({
                                                ...subcategory,
                                                name:e.target.value
                                            })
                                        }}
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
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
export default UpdateSubcategory;