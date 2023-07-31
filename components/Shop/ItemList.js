import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard";
import { Typography } from "@mui/material";

export default function ItemList(props) {
  const isDrawerOpen = props.isDrawerOpen;
  const products = props.products;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {products.length === 0 ? (
          <Typography>No product found</Typography>
        ) : (
          products.map((product) => (
            <Grid
              key={product.id}
              item
              sm={isDrawerOpen ? 12 : 6}
              md={isDrawerOpen ? 6 : 4}
              lg={isDrawerOpen ? 4 : 3}
            >
              <ItemCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
