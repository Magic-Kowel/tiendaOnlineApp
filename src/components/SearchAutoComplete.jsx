import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
function SearchAutoComplete({data,getData,getOptionSearch,title}){
    const [t] = useTranslation("global");
    useEffect(()=>{
        getData(data)
    },[data]);
    return(
        <Autocomplete
            disablePortal
            options={data}
            getOptionLabel={getOptionSearch}
            renderInput={(params) => <TextField {...params} label={title || t("search")} />}
            onChange={(event, newValue) => {
                if(!newValue){
                    getData(data);
                    return false;
                }
                getData([newValue]);
            }}
        />
    )
}
SearchAutoComplete.propTypes = {
    data: PropTypes.array.isRequired, // data debe ser un arreglo (array) y es requerido
    getData: PropTypes.func.isRequired, // getData debe ser una función y es requerido
    getOptionSearch:PropTypes.func.isRequired,
    title:PropTypes.string
};
export default SearchAutoComplete;