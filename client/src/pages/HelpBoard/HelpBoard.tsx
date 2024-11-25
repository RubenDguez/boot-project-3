import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ADD_POST, REMOVE_HELP_BOARD } from "../../utils/mutations";
import { FIND_ALL_POST } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

interface HelpBoard {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  createdBy: string;
  completedBy: string;
}

export default function HelpBoard() {
  useAuth();
  const { loading, error, data, refetch } = useQuery(FIND_ALL_POST);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [completedBy, setCompletedBy] = useState("");

  const [addHelpBoard] = useMutation(ADD_POST);
  const [removeHelpBoard] = useMutation(REMOVE_HELP_BOARD);

  const handleAdd = () => {
    addHelpBoard({
      variables: {
        input: { title, description, date, status, createdBy, completedBy },
      },
    }).then(() => {
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("");
      setCreatedBy("");
      setCompletedBy("");
      refetch();
    });
  };

  const handleRemove = (helpBoardId: string) => {
    removeHelpBoard({
      variables: { helpBoardId },
    }).then(() => {
      refetch();
    });
  };

  return (
    <div>
      <Typography variant="h4">Help Board</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        variant="outlined"
        margin="normal"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Created By"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Completed By"
        value={completedBy}
        onChange={(e) => setCompletedBy(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Post to Help Board
      </Button>
      {loading && <Typography>Loading...</Typography>}

      {error && <Typography>Error: {error.message}</Typography>}

      {!loading && !error && data && (
        <div>
          {data.findAllHelpBoards.map((helpBoard: any) => (
            <Card key={helpBoard._id} sx={{ margin: "10px 0" }}>
              <CardContent>
                <Typography variant="h6">{helpBoard.title}</Typography>
                <Typography>{helpBoard.description}</Typography>
                <Typography>{helpBoard.date}</Typography>
                <Typography>{helpBoard.status}</Typography>
                <Typography>{helpBoard.createdBy}</Typography>
                <Typography>{helpBoard.completedBy}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleRemove(helpBoard._id)}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
