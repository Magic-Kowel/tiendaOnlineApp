import DeleteIcon from '@mui/icons-material/Delete';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import { useTranslation } from 'react-i18next';
import {
    IconButton,
    ImageListItem,
    ImageList,
    Tooltip
} from '@mui/material';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteImagenProduct,getProductImagens } from '../reducers/product/product';
function ImagePreviewList({
    files,
    imageUrls,
    listImagenes,
    setSelectedFiles,
    fileInputRef
}){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const handleRemoveFiles = async (index) =>{
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setSelectedFiles((prev) => ({
            ...prev,
            files: updatedFiles,
        }));
        fileInputRef.current.value = null;
    }
    const handleRemoveImageUrls = async (index) =>{
        const updatedFiles = [...imageUrls];
        updatedFiles.splice(index, 1);
        setSelectedFiles((prev) => ({
            ...prev,
            imageUrls: updatedFiles,
        }));
    }
    const handleDeletePermanently = async (idImagen,idProduct) =>{
        Swal.fire({
            title: t("delete-this-image-permanently"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch((deleteImagenProduct(idImagen)))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        dispatch((getProductImagens(idProduct)))
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
    return(
        <>
            <ImageList sx={{ height: 450 }} cols={3} rowHeight={164}>
                {!!files.length &&
                    files.map((item, index) =>{
                            return(
                                <ImageListItem key={index}>
                                    <img
                                        src={URL.createObjectURL(item || null)}
                                        alt={`Blob Image ${index + 1}`}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                    <Tooltip title={t("delete")}>
                                        <IconButton
                                            color='error'
                                            onClick={()=>handleRemoveFiles(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ImageListItem>
                            )
                    })
                }
                {!!imageUrls.length &&
                    imageUrls.map((item, index) =>{
                            return(
                                <ImageListItem key={index}>
                                    <img
                                        src={(item || null)}
                                        alt={`Blob Image ${index + 1}`}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                    <Tooltip title={t("delete")}>
                                        <IconButton
                                            color='error'
                                            onClick={()=>handleRemoveImageUrls(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ImageListItem>
                            )
                    })
                }
                {!!listImagenes?.length &&
                    listImagenes.map((item, index) =>{
                            return(
                                <ImageListItem key={index}>
                                    <img
                                        src={(item.imagen || null)}
                                        alt={`${item.imagen + 1}`}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                    <Tooltip title={t("permanently-delete")}>
                                        <IconButton
                                            color='error'
                                            onClick={()=>handleDeletePermanently(item.idImagen,item.idProduct)}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0
                                            }}
                                        >
                                            <FolderDeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ImageListItem>
                            )
                    })
                }
            </ImageList>
        </>
    )
}
ImagePreviewList.propTypes = {
    files: PropTypes.array.isRequired,
    imageUrls: PropTypes.array.isRequired,
    listImagenes: PropTypes.array,
    setSelectedFiles: PropTypes.func.isRequired,
    fileInputRef: PropTypes.object.isRequired
 
};
export default ImagePreviewList;