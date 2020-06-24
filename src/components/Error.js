import React from 'react';
import Typography from '@material-ui/core/Typography';

const Error = () => (
    <div>
        <Typography variant="display3" gutterBottom>
            404
        </Typography>
        <Typography variant="subheading">
            This page does not exists.
        </Typography>
    </div>
)

export default Error;