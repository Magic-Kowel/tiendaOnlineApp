import {
    TableCell,
    Tooltip,
    ButtonGroup,
    Button
} from '@mui/material';
import PropTypes from 'prop-types';
function ActionButtons({row,listButtons,id}){
    return(
        <TableCell align="center">
          <ButtonGroup variant="contained"  color="inherit" sx={{ color:"#fff"}}>
            {listButtons.map((button, buttonIndex) => (
              <Tooltip key={buttonIndex} title={button.tooltipTitle}>
                <Button 
                  color={button?.color} 
                  onClick={() => button.onClick(row[id])}
                  sx={{
                    ...(button.customColor && {
                        backgroundColor:button.customColor,
                        '&:hover':{
                            backgroundColor:button.customColor
                        }
                      })
                  }}
                >
                  {button.icon}
                </Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </TableCell>
    )
}
ActionButtons.propTypes = {
    row: PropTypes.object.isRequired,
    listButtons: PropTypes.array.isRequired,
    id: PropTypes.string
};
export default ActionButtons;