import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import productService from "../services/ProductService";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const SingleProduct = (props) => {
  const classes = useStyles();
  const { product, onDelete, history } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} md={3} spacing={2}>
      <Card className={classes.root}>
        <CardHeader title={product.title} />
        <CardMedia className={classes.media} image={product.photo} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Price:</strong> {product.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Category:</strong> {product.proCategory}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="edit"
            onClick={(e) => {
              history.push("/admin/dashboard/updateProduct/" + product._id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              productService
                .deleteProduct(product._id)
                .then((data) => {
                  console.log(data);
                  onDelete();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>{product.body}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default withRouter(SingleProduct);
