import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import {
    IconButton,
    ImageListItem,
    ImageList,
    Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
function ImagePreviewList({
    listImagens,
    setSelectedFiles,
    fileInputRef
}){
    const [t] = useTranslation("global");
    const handleRemoveImagen = async (index) =>{
        const updatedFiles = [...listImagens];
        updatedFiles.splice(index, 1);
        setSelectedFiles((prev) => ({
            ...prev,
            files: updatedFiles,
        }));
        fileInputRef.current.value = null;
    }
    return(
        <>
            <ImageList sx={{ height: 450 }} cols={3} rowHeight={164}>
                {listImagens.length > 0 &&
                    listImagens.map((item, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={URL.createObjectURL(item || null)}
                            alt={`Blob Image ${index + 1}`}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <Tooltip title={t("delete")}>
                            <IconButton
                                color='error'
                                onClick={()=>handleRemoveImagen(index)}
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
                    ))}
            </ImageList>
        </>
    )
}
ImagePreviewList.propTypes = {
    listImagens: PropTypes.array.isRequired,
    setSelectedFiles: PropTypes.func.isRequired,
    fileInputRef: PropTypes.object.isRequired
 
};
export default ImagePreviewList;