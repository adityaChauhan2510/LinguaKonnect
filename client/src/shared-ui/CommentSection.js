import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";

export default function CommentSection({ unit }) {
  return (
    <Box maxWidth="2xl" mx="auto" sm={{ px: 3 }} lg={{ px: 4 }}>
      <Card>
        <CardContent>
          {unit &&
            unit.comments &&
            unit.comments.length > 0 &&
            unit.comments.map((comment, index) => (
              <>
                <h2 className="font-bold text-xl tracking-wider py-3">
                  Comments Section
                </h2>
                <Box key={index} display="grid" gap={2}>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <Avatar
                      src="/placeholder-user.jpg"
                      alt={comment.user_name}
                    />
                    <Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" fontWeight="bold">
                          @{comment.user_name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {comment.created_at}{" "}
                          {/* Use the relative time here */}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {comment.user_comment}
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<ArrowUpIcon />}
                      >
                        Upvote (0) {/* You can use actual upvote count here */}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            ))}
        </CardContent>
      </Card>
      <Box mt={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Add a comment
        </Typography>
        <TextField
          placeholder="Type your comment here."
          multiline
          fullWidth
          minRows={3}
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" size="medium">
          Post Comment
        </Button>
      </Box>
    </Box>
  );
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
