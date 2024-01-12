import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { createCategory } from '../../reducers/category/category';
import Swal from 'sweetalert2';
function CreateCategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t]=useTranslation("global");
    const [category,setCaegory] = useState({
        name:""
    });
    const createCategoryForm = async (e) =>{
        e.preventDefault();
        if(category.name.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createCategory(category))
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
                <Typography
                    sx={{
                        fontSize:sizeTitle,
                    }}
                    textAlign="center"
                    variant="h1"
                    gutterBottom
                >
                    {t("create-category")}
                </Typography>
                <Card>
                    <CardContent>
                        <GoBack />
                        <form
                            onSubmit={createCategoryForm}
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
                                        value={category.name}
                                        fullWidth
                                        label={t("name")}
                                        variant="outlined"
                                        onChange={((e)=>{
                                            setCaegory({
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
                                        {t("create")}
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
export default CreateCategory;