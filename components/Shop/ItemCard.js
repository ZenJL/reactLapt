import { ShoppingCart } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
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

export default function ItemCard(props) {
  const product = props.product;

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
        <Box sx={{ height: 30 }}>
          <Typography variant="body2" color="text.secondary">
            {`This is the description of ${product.title} 
        `}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="shopping cart">
          <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}
