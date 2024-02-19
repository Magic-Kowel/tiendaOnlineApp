import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
function FormAutocomplete({
        valueDefault,//valos que se pondra por defecto selecionado
        itemKey,//valos por cual se actualñisara 
        itemKeyForId,//valor pior cual se selecionara 
        data, //toda la data PARA MOSTRAR
        getData,//STATE PARA ACTUALIZAR EL VALOR
        getOptionSearch,//PARAMETROS PARA BUSCAR
        title,//titulo que poner 
        loading,
        error,
        helperText
    }){
    const [t] = useTranslation("global");
    return(
        <>
            <Autocomplete
                value={valueDefault}
                loading={loading}
                disablePortal
                options={data || []}
                getOptionLabel={getOptionSearch}
                clearOnEscape
                noOptionsText={t("no-results-found")}
                renderInput={(params) => (
                    <TextField 
                        {...params}
                        label={title || t("search")}
                        error={error}
                        helperText={helperText}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{
                                loading && <CircularProgress color="inherit" size={20} />
                            }</>,
                        }}
                    />
                )}
                onChange={(event, newValue)=>{
                    if(valueDefault){
                        if (newValue) {
                            getData((prevState) => ({
                                ...prevState,
                                [itemKey]: newValue[itemKeyForId]
                            }));
                            return false;
                        }
                    }
                    getData(newValue);
                }}
            />
        </>

    )
}
FormAutocomplete.propTypes = {
    data: PropTypes.array.isRequired, // data debe ser un arreglo (array) y es requerido
    valueDefault: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    itemKey: PropTypes.string,
    itemKeyForId: PropTypes.string,
    getData: PropTypes.func.isRequired, // getData debe ser una función y es requerido
    getOptionSearch:PropTypes.func.isRequired,
    title:PropTypes.string,
    isForm:PropTypes.bool,
    loading:PropTypes.bool,
    error:PropTypes.bool,
    helperText:PropTypes.string
};
export default FormAutocomplete;