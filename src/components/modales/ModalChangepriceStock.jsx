import { useState,useEffect } from 'react';
import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    Button
} from '@mui/material';
import PropTypes from 'prop-types';
import TextFieldNumber from '../TextFieldNumber';
function ModalChangepriceStock({
        open,
        setOpen,
        productVariationSelect,
        setListUpdateSize
    }){
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    useEffect(()=>{
        setPrice(productVariationSelect.price)
        setStock(productVariationSelect.stock)
    },[open])
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setListUpdateSize((prev)=>prev.map((item)=>{
            if(item.idSizeVariation===productVariationSelect.idSizeVariation){
                return {
                    ...item,
                    stock: stock,
                    price: price,
                    isUpdate:item.isNew?false:true
                };
            }
            return item;
        }))
        setOpen(false);
    };
    return(
        <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter Numbers</DialogTitle>
            <DialogContent>
                <TextFieldNumber
                    label="Price"
                    value={price}
                    onChange={setPrice}
                />
                <TextFieldNumber
                    label="Stock"
                    value={stock}
                    onChange={setStock}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}
ModalChangepriceStock.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    productVariationSelect: PropTypes.object.isRequired,
    setListUpdateSize: PropTypes.func.isRequired
}
export default ModalChangepriceStock;