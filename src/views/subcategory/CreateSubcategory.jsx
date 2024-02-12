import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Grid,
    TextField,
    Button
} from '@mui/material';
import Swal from 'sweetalert2';
import GoBack from '../../components/goBack';
import { colors } from '../../stylesConfig';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createSubcategory } from '../../reducers/subCategory/subCategory';
import TitlePage from '../../components/TitlePage';
function CreateSubcategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [t]=useTranslation("global");
    const {idCategory} = params;
    const [subcategoria,setSubcategoria]=useState({
        idCategory:idCategory,
        name:""
    });
    const handleCreateSubcategory = async (e) =>{
        e.preventDefault();
        if(subcategoria.name.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createSubcategory(subcategoria));
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
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
    return(
        <>
            <Container>
                <TitlePage 
                    title={t("create-subcategory")}
                />
                <Card>
                    <CardContent>
                        <GoBack />

                            <Grid
                            component="form"
                            onSubmit={handleCreateSubcategory}        
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            mt={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        value={subcategoria.name}
                                        fullWidth
                                        label={t("name")}
                                        variant="outlined"
                                        onChange={(e)=>{
                                            setSubcategoria({
                                                ...subcategoria,
                                                name:e.target.value
                                            });
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
                                        {t("create")}
                                    </Button>
                                </Grid>
                            </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
export default CreateSubcategory;