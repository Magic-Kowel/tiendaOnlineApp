import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
function SearchInput({setSearchProduct,searchProduct}){
    const [t] = useTranslation("global");
    const [searchParams, setSearchParams] = useSearchParams();
    const [search,setSearch] = useState("");
    const handleSearch = (e) =>{
        if (e?.key === 'Enter') {
            handleSearchValidate(search);
        }
    }
    useEffect(()=>{
        setSearch(searchProduct)
    },[searchProduct])
    const clearSearchParams = () => {
        setSearchParams('');
        setSearchProduct("");
        setSearch("");
    };
    const handleSearchValidate = (search) =>{
        if(search.trim() === ""){
            clearSearchParams();
        }
        setSearchProduct(search);
    }
    return(
    <>
        <Grid my={5} container justifyContent="center">
            <Grid item xs={12} md={9}>
                <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: "60rem" }}
                >
                <IconButton 
                    sx={{ p: '10px' }} 
                    aria-label="clear-searchInput"
                    onClick={()=>{
                        clearSearchParams()
                    }}
                >
                    <ClearIcon/>
                </IconButton>
                <InputBase
                    onChange={(e)=>{
                        setSearch(e.target.value)
                    }}
                    onKeyDown={handleSearch}
                    value={search}
                    margin="dense"
                    type="text"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={t("search-products")}
                    inputProps={{ 'aria-label': t("search-products") }}
                />
                <IconButton 
                    type="button" 
                    sx={{ p: '10px' }} 
                    aria-label="search"
                    onClick={()=>{
                        handleSearchValidate(search)
                    }}
                >
                    <SearchIcon />
                </IconButton>
                </Paper>
            </Grid>
        </Grid>
    </>
    )
}
SearchInput.propTypes = {
    setSearchProduct:PropTypes.func.isRequired,
    searchProduct:PropTypes.string.isRequired
};
export default SearchInput;