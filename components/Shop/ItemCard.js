import { ShoppingCart } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import * as React from "react";
import CartContext from "../../context/CartContext";

export default function ItemCard(props) {
  const product = props.product;

  const cartContext = React.useContext(CartContext);

  const addItemHandler = () => {
    cartContext.addItem({
      id: product.id,
      title: product.title,
      unit: product.amount,
      imageUrl: product.imageUrl,
      qty: 1,
    });
  };

  const loadImage = require.context("../../assets/images", true);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.category}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.title}
        subheader={product.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />
      <CardMedia
        component="img"
        height="394"
        // image={require("../../assets/images/BOOK-COMIC-1000.jpg")}
        // image={require("../../assets/images/" + product.imageUrl)}
        image={loadImage(product.imageUrl)}
        alt={product.title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Box
          sx={{
            height: 72,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body1"
            display="block"
            color="text.secondary"
            sx={{ flex: 1 }}
          >
            {`This is the description of ${product.title} 
        `}
          </Typography>
          <Typography
            variant="body2"
            color="red"
            display="flex"
            sx={{ justifyContent: "flex-end" }}
          >
            ${product.amount}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="shopping cart" onClick={addItemHandler}>
          <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}
