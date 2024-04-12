import { 
    Button
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'react-i18next';
function WhatsAppButton(){
    const [t] = useTranslation("global");
    const handleWhatsAppClick = () => {
        // Número de WhatsApp al que deseas enviar el mensaje
        const phoneNumber = '3141286432'; // Reemplaza con tu número
        
        // Construir el mensaje de WhatsApp
        const urlProduct = window.location.href;
        const message = `${t("interest-product")}: ${urlProduct}`;
        // URL de la API de WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
        // Redirigir al usuario a WhatsApp
        window.open(whatsappURL, '_blank');
    };
    return(
        <Button
            onClick={handleWhatsAppClick}
            endIcon={<WhatsAppIcon />}
            fullWidth
            variant="contained"
            color="success"
        >
            
                {t('buy-on-whatsapp')}
        
        </Button>
    )
}
export default WhatsAppButton;