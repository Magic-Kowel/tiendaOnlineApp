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
    files,
    imageUrls,
    setSelectedFiles,
    fileInputRef
}){
    const [t] = useTranslation("global");
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
            </ImageList>
        </>
    )
}
ImagePreviewList.propTypes = {
    files: PropTypes.array.isRequired,
    imageUrls: PropTypes.array.isRequired,
    setSelectedFiles: PropTypes.func.isRequired,
    fileInputRef: PropTypes.object.isRequired
 
};
export default ImagePreviewList;