import { PropsWithChildren } from 'react';
import { 
  Drawer, 
  Divider, 
  useTheme,
  useMediaQuery, 
  Typography, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  TableContainer,
  Table, 
  TableHead, 
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Icon
} from '@mui/material';
import { Box } from '@mui/system';

// import HomeIcon from '@mui/icons-material/Home';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEdit from '@mui/icons-material/ModeEdit';

import { useDrawerContext } from '../../contexts';
import { Link, useNavigate } from 'react-router-dom';

interface IListItemLink{
  to: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

const ListItemLink: React.FC<IListItemLink> = ({to, icon, label, onClick}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
    onClick?.();
  }

  return(
    <ListItemButton onClick={handleClick}>
    <ListItemIcon>
      <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItemButton>
  )
} 


export default function DashboardPage(){
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const {  isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext()

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="60%" height={theme.spacing(12)} display="flex" alignItems="center" justifyContent="center">
            <Typography 
              color='primary'
              variant='h4'
              fontWeight='bold'
            >
              Proap
            </Typography>
          
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemLink 
                icon='icon'
                to=''
                label='Página inicial'
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
            </List>

          </Box>

        </Box>
      </Drawer>

      <Box height="100vh" padding={6} marginLeft={smDown ? 0 : theme.spacing(28)}>
       
        <TableContainer  component={Paper} sx={{ maxHeight: '500px'}}>
          <Table aria-aria-label='simple table' stickyHeader>
            <TableHead>
              <TableCell>Id</TableCell>
              <TableCell>Solicitante</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Valor aprovado (integral)</TableCell>
              <TableCell>Data de solicitação</TableCell>
              <TableCell>Ações</TableCell>
            </TableHead>
            <TableBody>
              {
                tableData.map(row => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.requester}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.dateStatus}</TableCell>
                    <TableCell>
                      <Box>
                        {/* <RemoveRedEyeIcon/>
                        <ModeEditIcon />
                        <DeleteIcon /> */}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

const tableData = [
  {
    'id': 1,
    'requester': 'Itamar',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 2,
    'requester': 'João',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 3,
    'requester': 'Ricardo',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 4,
    'requester': 'Joselito',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 5,
    'requester': 'Lucas',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 6,
    'requester': 'Julio',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 7,
    'requester': 'Felipe',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 8,
    'requester': 'Airton',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 9,
    'requester': 'Julia',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 10,
    'requester': 'João',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
  {
    'id': 11,
    'requester': 'Matheus',
    'status': 'Aprovado',
    'value': 'R$500,00',
    'dateStatus': '10/06/22'
  },
]
