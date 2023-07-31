import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const ShoppingModal = (props) => {
  const isModalOpen = props.isModalOpen;
  const onCloseModal = props.onCloseModal;

  const cartItems = [
    {
      id: 1,
      qty: 1,
      title: "Superman: Action Comics",
      price: 12.99,
      imageUrl: "./BOOK-COMIC-1000.jpg",
    },
    {
      id: 2,
      qty: 2,
      title: "Batman: The Silver Age Omnibus",
      price: 99.99,
      imageUrl: "./BOOK-COMIC-1001.jpg",
    },
    {
      id: 3,
      qty: 3,
      title: "The Fifth Science",
      price: 24.99,
      imageUrl: "./BOOK-FICTION-1002.jpg",
    },
    {
      id: 4,
      qty: 5,
      title: "The Summer House",
      price: 15.0,
      imageUrl: "./BOOK-ROMANTIC-1003.jpg",
    },
    {
      id: 5,
      qty: 6,
      title: "The Art of Computer Programming",
      price: 187.99,
      imageUrl: "./BOOK-PROGRAMMING-1004.jpg",
    },
  ];

  const loadImage = require.context("../../assets/images", true);

  return (
    <Dialog open={isModalOpen} onClose={onCloseModal} maxWidth="lg">
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Sum</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      justifyItems: "center",
                    }}
                  >
                    {/* <Box
                      component={"img"}
                      alt={row.title}
                      src={loadImage(row.imageUrl)}
                      height={63}
                      sx={{ objectFit: "contain", display: "block" }}
                    />{" "} */}
                    <img
                      height="50"
                      width="50"
                      src={loadImage(row.imageUrl)}
                      alt={row.title}
                      style={{ objectFit: "contain", display: "block" }}
                    />
                    <span style={{ alignSelf: "center" }}>{row.title}</span>
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    {(row.qty * row.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={2} align="right">
                  Total Qty
                </TableCell>
                <TableCell colSpan={2} align="right">
                  Total price
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2} align="right">
                  {cartItems.reduce((acc, cur) => (acc += cur.qty), 0)}
                </TableCell>
                <TableCell colSpan={2} align="right">
                  $
                  {cartItems.reduce((acc, cur) => {
                    return (acc += cur.qty * cur.price);
                  }, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button onClick={onCloseModal}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingModal;
