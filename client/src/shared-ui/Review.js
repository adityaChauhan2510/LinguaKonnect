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
    <div className="">
      {reviews && reviews.length > 0 && (
        <>
          <h1 className="font-bold text-2xl tracking-wider py-5">
            What Other's say..
          </h1>
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
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body1"
                          color="text.primary"
                          className="font-bold mx-5"
                        >
                          {review.user_comment}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          mx={2}
                        >
                          ~{review.user_name}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </>
      )}
    </div>
  );
}
