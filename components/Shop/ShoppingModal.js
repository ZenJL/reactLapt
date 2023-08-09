import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const ShoppingModal = (props) => {
  const isModalOpen = props.isModalOpen;
  const onCloseModal = props.onCloseModal;

  const cartContext = useContext(CartContext);

  const cartItems = cartContext.items;

  const addItemInModal = (cartItem) => {
    return () =>
      cartContext.addItem({
        id: cartItem.id,
        title: cartItem.title,
        imageUrl: cartItem.imageUrl,
        unit: cartItem.amount,
        qty: 1,
      });
  };

  const removeItemHandler = (cartItemId) => {
    return () => {
      cartContext.removeItem(cartItemId);
    };
  };

  const loadImage = require.context("../../assets/images", true);

  return (
    <Dialog open={isModalOpen} onClose={onCloseModal} maxWidth="lg">
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent>
        {cartItems.length === 0 && <p>No item add</p>}
        {cartItems.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Amount</TableCell>
                  <TableCell>Sum</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems?.map((row) => {
                  return (
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
                      <TableCell align="right">{row.unit.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        {(row.qty * row.unit).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="increase-item"
                          onClick={addItemInModal(row)}
                        >
                          <ControlPointOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="remove-item"
                          onClick={removeItemHandler(row.id)}
                        >
                          <RemoveCircleOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  <TableCell colSpan={2} align="right">
                    Total Qty
                  </TableCell>
                  <TableCell colSpan={2} align="right">
                    Total amount
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} align="right">
                    {cartItems?.reduce((acc, cur) => (acc += cur.qty), 0)}
                  </TableCell>
                  <TableCell colSpan={2} align="right">
                    $
                    {cartItems
                      ?.reduce((acc, cur) => {
                        acc += cur.qty * cur.unit;
                        return acc;
                      }, 0)
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button disabled={cartItems.length < 1} onClick={onCloseModal}>
          Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingModal;
