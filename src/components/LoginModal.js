import * as React from 'react';
import { useDispatch } from 'react-redux';
import {useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaHeart, FaUser } from 'react-icons/fa'
import { login } from '../features/user/userSlice'
import wish from "../images/wish.svg";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()

const {name} = props

const loginHandler = () => {
  const email = emailRef.current.value
  const password = passwordRef.current.value
  dispatch(login({email, password}));
}

  return (
    <div >
     {name === 'login' && <Button onClick={handleOpen}><FaUser />&nbsp; وارد شوید</Button>}
     {name === 'like' && <Button onClick={handleOpen}><img src={wish} alt="wishlist" /></Button>}
     {name === 'single-product-like' && <Button onClick={handleOpen}><FaHeart />&nbsp; وارد شوید</Button>}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login To Your Account
          </Typography>
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label>Email</label>
            </Typography>
            <input ref={emailRef}/>
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label>Password</label>
            </Typography>
            <input ref={passwordRef} type='password'/>
          </div>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button onClick={loginHandler}>Login</Button>
            </Typography>

            <a href={`/register`}>Register</a>

        </Box>
      </Modal>
    </div>
  );
}