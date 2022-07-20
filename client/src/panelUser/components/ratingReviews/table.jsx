import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Link from '@mui/material/Link';

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

const columns = [
  { field: 'id' },
  { field: 'img' },
  { field: 'name' },
  { field: 'rating', type: 'number' },
  {
    field: 'reviews',
    width: 550,
    renderCell: (params) => <ExpandableCell {...params} />,
  },
];

const rows = [
  { id: 1, img: "img" , name: "name", rating: 3, reviews: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, lorem vel mattis aliquet, purus lorem tincidunt mauris, in blandit quam risus sed ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, img: "img" , name: "name",  rating: 4, reviews: "Vestibulum in massa nibh. Nulla venenatis justo non felis vulputate, eu mollis metus ornare. Vestibulum in massa nibh" }
];


// for (let i = 0; i < 200; i += 1) {
//   const bio = [];

//   for (let j = 0; j < randomInt(1, 5); j += 1) {
//     bio.push(randomArrayItem(lines));
//   }

//   rows.push({
//     id: i,
//     username: randomUserName(),
//     age: randomInt(10, 80),
//     bio: bio.join(' '),
//   });
// }

function TableReviews() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowHeight={() => 'auto'}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
      />
    </Box>
  );
}

export default TableReviews
