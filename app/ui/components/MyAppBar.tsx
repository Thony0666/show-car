import { AppBar, TitlePortal, UserMenu } from 'react-admin';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { Person } from '@mui/icons-material';

const SettingsButton = () => (
    <IconButton color="inherit">
        <SettingsIcon />
    </IconButton>
);

export const MyAppBar = () => (
    <AppBar>
        <TitlePortal variant="h5" />
        <span style={{ flex: 1 }} />
        <UserMenu icon={<Person/>}/>
    </AppBar>
);