import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Grid,
    TextField,
    Button
} from '@mui/material';
import GoBack from '../../components/goBack';
import TitlePage from '../../components/TitlePage';
import { colors } from '../../stylesConfig';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getCategory, updateCategory } from '../../reducers/category/category';
import Swal from 'sweetalert2';
function UpdateCategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [t]=useTranslation("global");
    const [category,setCategory] = useState({
        id:"",
        name:""
    });
    const handleGetCategory = async () =>{
        const { id } = params;
        const response = await dispatch(getCategory(id));
        setCategory({
            id: response.payload[0].id,
            name: response.payload[0].name
        });
    }
    const handleUpdateCategory = async (e) =>{
        e.preventDefault();
        if(category.name.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(updateCategory(category));
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
                <TitlePage
                    title={t("edit-category")}
                />
                <Card>
                    <CardContent>
                        <GoBack />
                            <Grid
                                component="form"
                                onSubmit={handleUpdateCategory}        
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                mt={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        value={category.name}
                                        fullWidth
                                        label={t("name")}
                                        variant="outlined"
                                        onChange={((e)=>{
                                            setCategory({
                                                ...category,
                                                name:e.target.value.trim()
                                            })
                                        })}
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
    )
}
export default UpdateCategory;