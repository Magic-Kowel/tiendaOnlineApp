import { useState,useEffect } from 'react';
import {
    Button,
    Box,
    Typography
} from '@mui/material';
import { colors } from '../stylesConfig';
import { useTranslation } from 'react-i18next';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const MAX_FILE_SIZE_MB = 20;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"]
function UploadFile() {
    const [t] = useTranslation("global");
    const [selectedFiles, setSelectedFiles] = useState([]);
 
    const [error, setError] = useState(null);
  
    useEffect(() => {
        // const list = selectedFiles.map((item)=>URL.createObjectURL(item || null))
        console.log(selectedFiles);
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
  
    const handleUpload = () => {
      if (selectedFiles.length > 0) {
        const formData = new FormData();
        console.log("selectedFiles",selectedFiles);
        selectedFiles.forEach((file, index) => {
            console.log("file",file);
            formData.append(`file_${index + 1}`, file);
        });
  
        console.log("Uploading files...", formData);
        // Aquí puedes enviar formData a tu servidor para manejar las imágenes.
      } else {
        console.error("No files selected");
      }
    };
  
    return (
      <>
        <Box p={3} border="1px dashed #ccc" borderRadius={8} textAlign="center">
            <input
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
        <ImageList  sx={{height: 450 }} cols={3} rowHeight={164}>
            {selectedFiles.files &&
            selectedFiles.files.map((item, index) => (
                <ImageListItem key={index}>
                    <img
                        src={URL.createObjectURL(item || null)}
                        alt={`Blob Image ${index + 1}`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
      </>
    );
  }
  
  export default UploadFile;