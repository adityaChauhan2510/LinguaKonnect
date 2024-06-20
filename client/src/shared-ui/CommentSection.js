import React from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { FaTrash } from "react-icons/fa";

export default function CommentSection({
  unit,
  comment,
  setComment,
  handleCommentSubmit,
  handleCommentDelete,
}) {
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Box maxWidth="2xl" mx="auto" sm={{ px: 3 }} lg={{ px: 4 }}>
      <Box py={3}>
        <Typography variant="h5" fontWeight="bold">
          Add a comment
        </Typography>
        <TextField
          placeholder="Type your comment here."
          multiline
          fullWidth
          rows={3}
          variant="outlined"
          margin="normal"
          value={comment}
          onChange={handleCommentChange}
        />
        <Button variant="contained" size="medium" onClick={handleCommentSubmit}>
          Post Comment
        </Button>
      </Box>

      {unit && unit.comments && unit.comments.length > 0 && (
        <Box py={4} display="grid" border={1} borderRadius={2}>
          {unit.comments.map((commentItem) => (
            <Box key={commentItem._id} display="grid" gap={2} px={4}>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <Avatar
                  src="/placeholder-user.jpg"
                  alt={commentItem.user_name}
                />
                <Box>
                  <div className="flex flex-row gap-5 md:gap-[12rem] items-center">
                    <p className="font-bold text-sm py-1 text-gray-700">
                      @{commentItem.user_name}
                    </p>
                    <p>
                      {formatDistanceToNow(new Date(commentItem.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                    <Button
                      variant="text"
                      size="small"
                      color="error"
                      startIcon={<FaTrash />}
                      onClick={(e) => handleCommentDelete(e, commentItem._id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <p className="font-bold text-md py-3 capitalize">
                    {commentItem.user_comment}
                  </p>
                  <div className="py-1">
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<ArrowUpIcon />}
                    >
                      Upvote (0) {/* You can use actual upvote count here */}
                    </Button>
                  </div>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
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
