import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import './datatable.scss'
import './data.css'

function Row({ id, amount_total, createdAt, price_total, state, details, products }) {
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`#${id}`}
        </TableCell>
        <TableCell align="right">{amount_total}</TableCell>
        <TableCell align="right">{`$${price_total}`}</TableCell>
        <div align="right" className={state === 'En proceso' ? 'proceso' : state === 'Finalizada' ? 'fin' : 'activa'}>
          {state}
        </div>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History: {`${createdAt.slice(0, -14)} - ${createdAt.slice(-13, 19)}`}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Img</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="right">Talla</TableCell>
                    <TableCell align="right">Producto (Unidad)</TableCell>
                    <TableCell align="right">Precio (Unidad)</TableCell>
                    <TableCell align="right">Pricio Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map(orden => {
                    const product = products.find(value => value.id === orden.productID)
                    return (
                      <TableRow key="historyRow.date">
                        <TableCell component="th" scope="row">
                          {product.nickname}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <img className="cellImg" src={product.img} alt="avatar" />
                        </TableCell>
                        <TableCell align="right">{product.color.name}</TableCell>
                        <TableCell align="right">{orden.size}</TableCell>
                        <TableCell align="right">{orden.amount}</TableCell>
                        <TableCell align="right">{`$${orden.priceUnit}`}</TableCell>
                        <TableCell align="right">{`$${orden.priceTotal}`}</TableCell>
                        <TableCell align="right"></TableCell>
                        <Link to={`/productDetails/${product.id}`} className="btn btn-primary m-auto px-3">
                          View
                        </Link>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function CollapsibleTable({ Orders }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Orden #</TableCell>
            <TableCell align="right">Unidades Total</TableCell>
            <TableCell align="right">Precio Total Orden</TableCell>
            <TableCell align="right">Estado de Orden</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Orders.ordens ? (
            Orders.ordens.map(e => <Row id={e.id} amount_total={e.amount_total} createdAt={e.createdAt} price_total={e.price_total} state={e.state} details={e.details} products={e.products} />)
          ) : (
            <div>No tiene Ordenes Disponibles</div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CollapsibleTable
