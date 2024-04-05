
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Tooltip,
    Divider,
    Button 
} from '@mui/material';
import PropTypes from 'prop-types';
function StackTable({
    listTitles,
    listKeys,
    dataList,
    listButtons,
    id
}){
    return(
        <>
        <Paper sx={{
                boxShadow:5,
                marginTop:'0.5rem',
                width: '100%',
                overflow: 'hidden',
                paddingTop:"0.5rem"
            }}>
               <List sx={{ width: '100%', bgcolor: 'background.paper' }} aria-label="contacts">
                    {dataList.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`}>
                            {listKeys.map((key, keyIndex) => (
                                <>
                                    <ListItem
                                        key={`StackTable-${key}-${keyIndex}`}
                                    >
                                        
                                            <ListItemText
                                                primary={listTitles[keyIndex]}
                                                sx={{ textAlign: 'center' }}
                                            />
                                            <ListItemText
                                                primary={row[key]}
                                                sx={{ textAlign: 'center' }}
                                            />
                                    </ListItem>
                                </>
                            ))}
                            <ListItem disablePadding sx={{
                                display:"flex",
                                flexDirection:"column"
                            }}>
                                {listButtons.map((button, buttonIndex) => (
                                    <Tooltip key={`stackButtonAction-${buttonIndex}`} title={button.tooltipTitle}>
                                            <Button variant="contained"
                                                fullWidth
                                                color={button.color}
                                                sx={{
                                                    marginY:1,
                                                    justifyContent: 'center',
                                                    ...(button.customColor && {
                                                        backgroundColor:button.customColor,
                                                        '&:hover':{
                                                            backgroundColor:button.customColor
                                                        }
                                                    })
                                                }}
                                                onClick={() => button.onClick(row[id])}
                                            >
                                                {button.icon}
                                            </Button>
                                        
                                    </Tooltip>
                                ))}
                            </ListItem>
                            <Divider />
                             
                        </div>
                    ))}
                </List>
        </Paper>
        </>
    )
}
StackTable.propTypes = {
    dataList: PropTypes.array.isRequired,
    listKeys: PropTypes.array.isRequired,
    listTitles: PropTypes.array.isRequired,
    listButtons: PropTypes.array.isRequired,
    id: PropTypes.string
};
export default StackTable;