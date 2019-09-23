import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, tip, onClick, btnClassName, tipClassName, placement, authenticated }) => (
    <Tooltip title={tip} className={tipClassName} placement={placement}>
        <IconButton onClick={onClick} className={btnClassName} disabled={!authenticated}>
            {children}
        </IconButton>
    </Tooltip>

)
