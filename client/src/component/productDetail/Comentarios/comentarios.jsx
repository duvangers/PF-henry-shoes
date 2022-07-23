import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentIcon from '@mui/icons-material/Comment'
import { getAllProductReviews } from "../../../redux/actions";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import "./style.css";
import moment from "moment";

function Comentarios({id}) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProductReviews(id));
    })
    const reseñas = useSelector((state) => state.ProductReviews);
    const allReviews = reseñas.reviews

    return(

    <div className="container">
          
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    <Stack direction="row" spacing={2}>
                    <CommentIcon className="icon" />
                     <div>Reseñas de Clientes</div>
                    </Stack>    
                    
                    </button>
            </h2>
            {
                 allReviews ? (allReviews.map((e) => {
                    return(
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    
                        <div class="accordion-body">
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                        <Avatar alt="img/avatar" src={e.user.avatar_url}/>
                                        </ListItemAvatar>
                                        
                                        <ListItemText
                                        primary={
                                            <div>
                                                 <Stack direction="row" spacing={1}>
                                                 <Rating defaultValue={e.rating} precision={1} readOnly />
                                                 <div>{moment(e.createdAt).format('LL')}</div>
                                                </Stack>
                                                <div style={{color: 'purple'}}>{e.user.email}</div>
                                            </div>
                                        }
                                        secondary={
                                            <React.Fragment>
                                               
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                
                                            </Typography >
                                            <div>{e.comment}</div>
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                            </List>
                        </div>
                    </div>
                    )      
                 })
                   
                ) : ( 
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        
                            <div class="accordion-body">
                            <div>No hay Reseñas de este producto</div>
                            </div>
                        </div>
                    )
            } 
            
        </div>
    </div>

    )
}


export default Comentarios



