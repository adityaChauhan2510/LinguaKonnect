import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function Review({ reviews }) {
  return (
    reviews && (
      <div className="my-5">
        {reviews.map((review, index) => (
          <List
            key={index}
            sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={review.user_name}
                  src={`/static/images/avatar/${index + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {review.user_name}
                    </Typography>
                    <p>{review.user_comment} </p>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </div>
    )
  );
}
