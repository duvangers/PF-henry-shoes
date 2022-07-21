import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import './data.css'





function TableReviews({reviews}) {

  const rows = [];

  for (let i = 0; i < reviews.length; ++i) {
  
    rows.push({
      id: reviews[i].id,
      img: reviews[i].product.img,
      name: reviews[i].product.nickname,
      rating: reviews[i].rating,
      reviews:reviews[i].comment
    })
  }

  const columns = [
    { field: 'id', width: 80 },
    { field: 'img', 
     renderCell: (params) => <Img {...params} />
    },
    { field: 'name', },
    { field: 'rating',
     type: 'number',
     width: 140,
     renderCell: (params) => <HalfRating {...params} /> , 
    },
    {
      field: 'reviews',
      width: 550,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
  ];

  const Img = ({value}) => {
    return (
      <TableCell component="th" scope="row">
        <img className="cellImg" src={value} alt="img" />
      </TableCell>
    );
  }
  
  const HalfRating = ({value}) => {
    return (
      <Stack spacing={1}>
        <Rating name="half-rating-read" defaultValue={value} precision={1} readOnly />
      </Stack>
    );
  }
  
  const ExpandableCell = ({ value }) => {
    const [expanded, setExpanded] = React.useState(false);
  
    return (
      <Box>
        {expanded ? value : value.slice(0, 176)}&nbsp;
        {value.length > 176 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            type="button"
            component="button"
            sx={{ fontSize: 'inherit' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'view less' : 'view more'}
          </Link>
        )}
      </Box>
    );
  };
  
  
  
 

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      { rows ? (
      <DataGrid
        rows={rows}
        columns={columns}
        getRowHeight={() => 'auto'}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
      /> ) : (<div> No hay reviews</div>)
      }
    </Box>
  );

}

export default TableReviews
