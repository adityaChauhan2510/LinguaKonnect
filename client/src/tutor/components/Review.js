import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

export default function Review({ reviews }) {
  return (
    <div className="my-5">
      {reviews && reviews.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
          {reviews.map((review, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={review.user_name}
                    src={`/static/images/avatar/${index + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <div className="flex flex-row gap-8">
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.user_name}
                      </Typography>
                      <span>{review.user_comment}</span>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <TextField
          className="w-full p-2"
          aria-label="empty textarea"
          placeholder="No reviews"
          disabled
          multiline
          rows={5}
          fullWidth
        />
      )}
    </div>
  );
}
