import { 
  Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, TextField, Box, Grid, useMediaQuery, useTheme
} from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ADD_POST, REMOVE_HELP_BOARD } from "../../utils/mutations";
import { FIND_ALL_POST } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
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

interface Post {
    id: string;
    title: string;
    description: string;
    date: string;
    status: string;
    type: 'needed' | 'offered';
    createdBy: string;
    completedBy: string;
    }

export default function HelpBoard() {
    useAuth();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = useState(false);
    const [openOffered, setOpenOffered] = useState(false);
    const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'status' | 'createdBy' | 'completedBy'>>({
        title: '',
        description: '',
        date: '',
        type: 'needed'
    });
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

    const handleAddPost = (type: 'needed' | 'offered') => {
            const post: Post = {
                id: Date.now().toString(),
                ...newPost,
                status: 'open',
                type:  'needed',
                createdBy: 'currentUser', 
                completedBy: '',
            };
            setPosts([...posts, post]);
            setOpen(false);
            setOpenOffered(false);
            setNewPost({ title: '', description: '', date: '', type: 'needed' });
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

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h2">Help Board</Typography>
                </Grid>
                
                <Grid item xs={12}>
                    <Grid container spacing={5} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={3}>
                            
                            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                              post a help request
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                     
                            <Button variant="contained" color="secondary" onClick={() => setOpenOffered(true)}>
                                post a help offer
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                    <Grid item xs={10} md={3}>
                           
                            {posts.filter(post => post.type === 'needed').map((post) => (
                                <Card key={post.id} sx={{ backgroundColor: post.status === 'open' ? '#e7decd' : '#34471f', mb: 2 }}>
                                    <CardContent>
                                            <Typography variant="h6" color="#698f3f" sx={{ textAlign: 'center' }}>{post.title}</Typography>
                                            <Typography variant="body1" color='black' sx={{ textAlign: 'center' }}>{post.description}</Typography>
                                            <Typography variant="h6" color="#34471f" sx={{ textAlign: 'center' }}>{getLabel(post.type)}{post.date}</Typography>
                                            <Typography variant="caption" color={post.status === 'open' ? 'success.main' : 'text.secondary'} sx={{ textAlign: 'center' }}>
                                                Status: {post.status}
                                            </Typography>
                                            {post.status === 'open' && (
                                                <Button 
                                                    variant="contained" 
                                                    color="secondary" 
                                                    fullWidth 
                                                    sx={{ mt: 2 }}
                                                    // onClick={() => handleComplete(post.id)}
                                                >
                                                  Offer Help
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                            ))}
                            </Grid>
                            <Grid item xs={10} md={3}>
                               
                                {posts.filter(post => post.type === 'offered').map((post) => (
                                    <Card key={post.id} sx={{ backgroundColor: post.status === 'open' ? '#e7decd' : '#34471f', mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" color="#698f3f" sx={{ textAlign: 'center' }}>{post.title}</Typography>
                                            <Typography variant="body1" color='black' sx={{ textAlign: 'center' }}>{post.description}</Typography>
                                            <Typography variant="h6" color="#34471f" sx={{ textAlign: 'center' }}>{getLabel(post.type)}{post.date}</Typography>
                                            <Typography variant="caption" color={post.status === 'open' ? 'success.main' : 'text.secondary'} sx={{ textAlign: 'center' }}>
                                                Status: {post.status}
                                            </Typography>
                                            {post.status === 'open' && (
                                                <Button 
                                                    variant="contained" 
                                                    color="secondary" 
                                                    fullWidth 
                                                    sx={{ mt: 2 }}
                                                    // onClick={() => handleComplete(post.id)}
                                                >
                                                  Accept Help
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>

            

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ backgroundColor: '#34471f', color: 'white', textAlign: 'center' }}>Request Help Services</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#698f3f' }}>
                    <TextField
                        fullWidth
                        label="Post Title"
                        margin="normal"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Description of Help Needed"
                        margin="normal"
                        multiline
                        rows={4}
                        value={newPost.description}
                        onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Date Help is Needed"
                        margin="normal"
                        type="date"
                        value={newPost.date}
                        onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                        onClick={() => handleAddPost('needed')}
                    >
                        Post Help Needed
                    </Button>
                </DialogContent>
            </Dialog>

            <Dialog 
                open={openOffered} 
                onClose={() => setOpenOffered(false)}
                aria-labelledby="offer-dialog-title"
            >
                <DialogTitle id="offer-dialog-title" sx={{ backgroundColor: '#34471f', color: 'white', textAlign: 'center' }}>Offer Help Services</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#698f3f' }}>
                    <TextField
                        fullWidth
                        label="Post Title"
                        margin="normal"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        autoFocus
                    />
                    <TextField
                        fullWidth
                        label="Description of Help Offered"
                        margin="normal"
                        multiline
                        rows={4}
                        value={newPost.description}
                        onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Date Help is Available"
                        margin="normal"
                        type="date"
                        value={newPost.date}
                        onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                        onClick={() => handleAddPost('offered')}
                    >
                        Post Help Offered
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
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
