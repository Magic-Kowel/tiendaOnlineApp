import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
function SearchAutoComplete({
        valueDefault,
        itemKey,
        data,
        getData,
        getOptionSearch,
        title
    }){
    const [t] = useTranslation("global");
    useEffect(()=>{
        if(!valueDefault){
            getData(data);
        }
    },[data]);
    return(
        <>
            <Autocomplete
                value={valueDefault}
                loading={data.length<=0}
                disablePortal
                options={data || []}
                getOptionLabel={getOptionSearch}
                renderInput={(params) => (
                    <TextField 
                        {...params}
                        label={title || t("search")}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{data.length<=0 && <CircularProgress color="inherit" size={20} />}</>,
                        }}
                    />
                )}
                onChange={(event, newValue)=>{
                    if(valueDefault){
                        if (newValue) {
                            getData((prevState) => ({
                                ...prevState,
                                [itemKey]: newValue.id
                            }));
                        }
                        return false;
                    }
                    if(!newValue){
                        getData(data);
                        return false;
                    }
                    getData([newValue]);
                }}
            />
        </>

    )
}
SearchAutoComplete.propTypes = {
    data: PropTypes.array.isRequired, // data debe ser un arreglo (array) y es requerido
    valueDefault: PropTypes.array.isRequired,
    itemKey: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired, // getData debe ser una función y es requerido
    getOptionSearch:PropTypes.func.isRequired,
    title:PropTypes.string
};
export default SearchAutoComplete;