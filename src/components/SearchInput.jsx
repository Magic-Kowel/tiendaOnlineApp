import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
function SearchInput({setSearchProduct}){
    const [t] = useTranslation("global");
    const [search,setSearch] = useState("");
    const handleSearch = (e) =>{
        if (e?.key === 'Enter') {
            setSearchProduct(search)
        }
    }
    return(
    <>
        <Grid my={5} container justifyContent="center">
            <Grid item xs={12} md={9}>
                <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: "60rem" }}
                >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    onChange={(e)=>{
                        setSearch(e.target.value)
                    }}
                    onKeyDown={handleSearch}
                    value={search}
                    margin="dense"
                    type="search"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={t("search-products")}
                    inputProps={{ 'aria-label': t("search-products") }}
                />
                <IconButton 
                    type="button" 
                    sx={{ p: '10px' }} 
                    aria-label="search"
                    onClick={()=>setSearchProduct(search)}
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
    setSearchProduct:PropTypes.func.isRequired
};
export default SearchInput;