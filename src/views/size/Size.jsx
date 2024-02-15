import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getSizes,
    createSize,
    deleteSize
} from "../../reducers/size/size";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import {
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    TextField,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TitlePage from "../../components/TitlePage";
import SearchAutoComplete from "../../components/SearchAutoComplete"
import DataTable from "../../components/DataTable/DataTable";
import { sizeTitleForm } from "../../stylesConfig";
import { colors } from "../../stylesConfig";
function Size(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {sizes} = useSelector((state)=>state.size);
    const [t] = useTranslation("global");
    const [sizeList, setSizeList] = useState([]);
    const [sizeForm, setSizeForm] = useState({nameSize:''});
    const getSizeData = async () =>{
        await dispatch(getSizes());
    }
    useEffect(()=>{
        getSizeData();
    },[]);
    useEffect(()=>{
        setSizeList(sizes);
    },[sizes]);
    const handleCreateSize = async (e) =>{
        e.preventDefault();
        if(sizeForm.nameSize.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createSize(sizeForm))
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            getSizeData();
            setSizeForm({nameSize:""})
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const handleDeleteSize = (idSize) =>{
        Swal.fire({
            title: t("want-to-delete-size-clothe"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteSize(idSize))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        getSizeData();
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
    const handleUpdateSize = async (idSize) =>{
        navigate(`/size/edit/${idSize}`);
    }
    const listTitles=[t("size-clothe"),t("actions")];
    const listKeys=["nameSize"];
    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idSize) => handleDeleteSize(idSize),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("update"),
            onClick: (idSize) => handleUpdateSize(idSize),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <>
            <Container>
                <TitlePage
                    title={t("size-clothes")}
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} md={7} lg={7}>
                        <SearchAutoComplete
                            data={sizes}
                            getData={setSizeList}
                            getOptionSearch={(item)=>item.nameSize}
                        />
                        <DataTable 
                            listTitles={listTitles}
                            listKeys={listKeys}
                            dataList={sizeList}
                            listButtons={listButtons}
                            id="idSize"
                        />
                    </Grid>
                    <Grid item sm={12} md={5} lg={5}>
                        <Card
                            component="form"
                            onSubmit={handleCreateSize}
                        >
                            <CardContent>
                                    <Typography
                                        sx={{
                                            fontSize:sizeTitleForm,
                                        }}
                                        textAlign="center"
                                        variant="h2"
                                        gutterBottom
                                    >
                                        {t("create-size-clothes")}
                                    </Typography>
                                    <Grid
                                        container 
                                        spacing={2}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                value={sizeForm.nameSize}
                                                onChange={(e)=>{
                                                    setSizeForm({nameSize:e.target.value})
                                                }}
                                                fullWidth
                                                label={t("size-clothe")} 
                                                variant="outlined" 
                                            />
                                        </Grid>
                                    </Grid>
                            </CardContent>
                            <CardActions>
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
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Size;