import { React, useState } from 'react';
import '../../styles/navbar.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import Logo from './Logo.jsx';
import UserIconMenu from './UserIconMenu';
import Search from '../Explore/SearchBar.jsx';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close.js';
import Button from '@mui/material/Button';

const AuthButton = ({ loggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  if (loggedIn) {
    return <UserIconMenu />;
  }

  const navigateToLogin = () => {
    if (
      location.pathname == '/mapCreation/OutlineSelection' ||
      location.pathname == '/mapCreation/DataEditor' ||
      location.pathname == '/mapCreation/GraphicsEditor'
    ) {
      setPath('/login');
      openConfirmationModal();
    } else {
      navigate('/login');
    }
  };

  return (
    <IconButton color="inherit" aria-label="login" onClick={navigateToLogin}>
      <LoginIcon />
      <span style={{ fontSize: '18px' }}>Login</span>
    </IconButton>
  );
};
import { Modal } from '@mui/material';
import { useSaveMap } from '../MapCreation/useSaveMap';
import { useClearStates } from '../MapCreation/useClearStates';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const saveMapData = useSaveMap();
  const {clearStatesComplete, deleteClearStatesComplete}  = useClearStates();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isExplorePage = location.pathname == '/explore';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [path, setPath] = useState('');

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };
  const closeConfirmationModal = () => {
    setIsModalOpen(false);
  };

  const navigateToExplorePage = () => {
    if (
      location.pathname == '/mapCreation/OutlineSelection' ||
      location.pathname == '/mapCreation/DataEditor' ||
      location.pathname == '/mapCreation/GraphicsEditor'
    ) {
      if (loggedIn) {
        /// Save map data then clear states. save up to the stage you in or another solution
        // if saved before map graphics stage you will get container error
        // clearStatesComplete is a promise
        clearStatesComplete();
        navigate('/explore');
      } else {
        setPath('/explore');
        openConfirmationModal();
      }
    }else{
      navigate('/explore');
    }
  };

  const navigateToMapCreation = () => {
    if (
      location.pathname == '/mapCreation/OutlineSelection' ||
      location.pathname == '/mapCreation/DataEditor' ||
      location.pathname == '/mapCreation/GraphicsEditor'
    ) {
      if (loggedIn) {
        /// Save map data then clear states. save up to the stage you in or another solution
        // if saved before map graphics stage you will get container error
        // clearStatesComplete is a promise
        clearStatesComplete();
        navigate('/mapCreation');

      } else {
        setPath('/mapCreation');
        openConfirmationModal();
      }
    }else{
      navigate('/mapCreation');
    }
  };

  const handleNavigate = () => {
    closeConfirmationModal();
    deleteClearStatesComplete();
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar className={'navigationBar'}>
        <Logo openConfirmationModal={openConfirmationModal} setPath={setPath} />
        <div className={'iconContainer'}>
          {isExplorePage && <Search />}
          <IconButton
            id="exploreButton"
            color="inherit"
            aria-label="explore"
            onClick={navigateToExplorePage}
          >
            <ExploreIcon />
          </IconButton>
          <IconButton
            id="mapCreation"
            color="inherit"
            aria-label="add"
            onClick={navigateToMapCreation}
          >
            <AddIcon />
          </IconButton>
          <AuthButton
            loggedIn={loggedIn}
            openConfirmationModal={openConfirmationModal}
            setPath={setPath}
          />
        </div>
      </Toolbar>
      <Modal open={isModalOpen} onClose={closeConfirmationModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            pb: 10,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="div" style={{ marginBottom: '15px' }}>
            Are you sure you want to go back? Your progress wont be saved.
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeConfirmationModal}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" onClick={handleNavigate} style={{ marginRight: '10px' }}>
            Yes
          </Button>
          <Button variant="outlined" onClick={closeConfirmationModal}>
            No
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
}
