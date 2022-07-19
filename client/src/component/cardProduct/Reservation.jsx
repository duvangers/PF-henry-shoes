import './Reservation.css'
import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const validate=(email)=>{
  let error={}
  if(email===''){
    error.email = 'colocar un email'
  }
  else if(!/\S+@\S+\.\S+/.test(email)){
    error.email = 'colocar un email valido'
  }
return error
}
export default function ReservationButton({
  reserve,
  setReserve,
  stock_total,
  size,
}) {
  const handleOpen = () => {
    setReserve(true);
  };

  const handleClose = () => {
    setReserve(false);
  };
  const handleNotificate = () => {
    if(Object.keys(error).length !== 0){
      return null
    }else{
      setEmail('')
      setReserve(false);
      console.log("notificacion a: ");
      }
  };
  const [error , setError] = useState({})
  const [email , setEmail]=useState('')
  // const [message , setMessage]=useState(false)
  const handleInput =(e)=>{
     e.preventDefault()
     setEmail(e.target.value)
     setError(validate(e.target.value))
    }

  return (
    <div>
      <div
        className="btn btn-warning bold-btn"
        variant="outlined"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        add to cart
      </div>
      <Dialog open={reserve} onClose={handleClose}>
        <DialogTitle>Ups!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lamentablemente no contamos con stock de este producto
            {stock_total ? ` en la talla ${size}` : " en ninguna talla"}, Si
            desea ser notificado cuando se encuentre en stock por favor ingrese
            su Email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            name="email"
            variant="standard"
            value={email}
            onChange={e=>handleInput(e)}
          />
          {error.email ? <div className='error'>{error.email}</div> :null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleNotificate}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
