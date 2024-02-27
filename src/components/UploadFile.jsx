import { useState,useEffect,useRef} from 'react';
import {
    Button,
    Box,
    Typography
} from '@mui/material';
import { colors } from '../stylesConfig';
import { useTranslation } from 'react-i18next';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImagePreviewList from './ImagePreviewList ';
import PropTypes from 'prop-types';
const MAX_FILE_SIZE_MB = 20;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"]
function UploadFile({
    setProduct
}) {
    const fileInputRef = useRef(null);
    const [t] = useTranslation("global");
    const [selectedFiles, setSelectedFiles] = useState([]);
 
    const [error, setError] = useState(null);
  
    useEffect(() => {

        console.log(selectedFiles);
        setProduct((prev)=>({
            ...prev,
            ...selectedFiles
        }));
    }, [selectedFiles]);
  
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
    
        // File type validation
        const invalidFileType = files.some(file => !ALLOWED_FILE_TYPES.includes(file.type));
        if (invalidFileType) {
            setError("Invalid file type. Please upload JPEG, PNG, or GIF images.");
            return;
        }
    
        // File size validation
        const invalidFileSize = files.some(file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
        if (invalidFileSize) {
            setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose smaller files.`);
            return;
        }
  
        setSelectedFiles((prev) => ({
            ...prev,
            files: [...(prev.files ?? []), ...files],

        }));
        setError(null);
    };
    return (
      <>
        <Box p={3} border="1px dashed #ccc" borderRadius={8} textAlign="center">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="image-file-input"
            />
            <label htmlFor="image-file-input">
                <Button 
                    variant="outlined" 
                    component="span"
                    endIcon={<FileUploadIcon />}
                    sx={{
                        color:colors.primaryColor,
                        '&:hover':{
                            color:colors.primaryColor
                        },
                        borderColor:colors.primaryColor,
                        ':hover':{
                            borderColor:colors.primaryColor
                        },
                    }}
                >
                    {t("select-images")}
                </Button>
            </label>
            {error && (
                <Typography variant="body2" color="error" mt={2}>
                {error}
                </Typography>
            )}
        </Box>
        {
            selectedFiles.files&&(
                <ImagePreviewList
                    listImagens={selectedFiles.files}
                    setSelectedFiles={setSelectedFiles}
                    fileInputRef={fileInputRef}
                />
            )
        }
      </>
    );
}
UploadFile.propTypes = {
    setProduct: PropTypes.func.isRequired
};
  export default UploadFile;