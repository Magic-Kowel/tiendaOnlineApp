import { useState} from 'react';
import {
    Button,
    Box,
    Typography
} from '@mui/material';
import { colors } from '../stylesConfig';
import { useTranslation } from 'react-i18next';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PropTypes from 'prop-types';
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg","image/jpg", "image/png"]
function UploadFile({
    setSelectedFiles,
    fileInputRef
}) {

    const [t] = useTranslation("global");

    const [error, setError] = useState(null);
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        fileInputRef.current = null;
        // File type validation
        const invalidFileType = files.some(file => !ALLOWED_FILE_TYPES.includes(file.type));
        if (invalidFileType) {
            setError(t("invalid-file-type"));
            return;
        }
    
        // File size validation
        const invalidFileSize = files.some(file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
        if (invalidFileSize) {
            setError(t("file-size-exceeds", {fileSize: MAX_FILE_SIZE_MB }));
            return;
        }
        event.target.value = null;
        setSelectedFiles((prev) => ({
            ...prev,
            files: [...(prev.files ?? []), ...files],

        }));
        setError(null);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        // Llamando a handleFileChange para procesar los archivos soltados
        handleFileChange({ target: { files } });
    };
    const preventDefault = (event) => {
        event.preventDefault();
    };
    return (
      <>
        <Box
            p={3}
            border="1px dashed #ccc"
            borderRadius={8}
            textAlign="center"
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="image-file-input"
            />
            <label htmlFor="image-file-input"   
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <FileUploadIcon
                    sx={{
                        color:colors.primaryColor,
                        fontSize:'7rem',
                    }}
                
                />
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
                {error && (
                    <Typography variant="body2" color="error" mt={2}>
                        {error}
                    </Typography>
                )}
            </label>
        </Box>
      </>
    );
}
UploadFile.propTypes = {
    setSelectedFiles: PropTypes.func.isRequired,
    fileInputRef: PropTypes.object.isRequired
};
export default UploadFile;