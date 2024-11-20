import { 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  TextField,
  Box,
  Grid
} from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'open' | 'completed';
  type: 'needed' | 'offered';
  createdBy: string;
  completedBy?: string;
}

export default function HelpBoard() {
    useAuth();
    const [Posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = useState(false);
    const [openOffered, setOpenOffered] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        date: '',
        type: 'needed'
    });

    const handleAddPost = () => {
        const Post: Post = {
            id: Date.now().toString(),
            ...newPost,
            status: 'open',
            createdBy: 'currentUser', // You'll want to get this from your auth context
        };
        setPosts([...Posts, Post]);
        setOpen(false);
        setNewPost({ title: '', description: '', date: '', type: 'needed' });
    };

    const handleComplete = (PostId: string) => {
        setPosts(Posts.map(Post => 
            Post.id === PostId 
                ? { ...Post, status: 'completed', completedBy: 'currentUser' }
                : Post
        ));
    };

    const getLabel = (type: 'needed' | 'offered') => {
        return type === 'needed' ? 'Help Needed on: ' : 'Help Available on: ';
};

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2">Help Board</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                            Request Help
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setOpenOffered(true)}>
                            Offer Help
                        </Button>
                    </Box>
                </Grid>
                
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {Posts && Posts.length > 0 && Posts.map((post) => (
                            <Grid item xs={12} md={6} lg={4} key={post.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5">{post.title}</Typography>
                                        <Typography variant="body1">{post.description}</Typography>
                                        <Typography variant="h6">{getLabel(post.type)}{post.date}</Typography>
                                        {/* <Typography variant="h6" color="secondary">
                                           Help Needed on: {new Date(post.date).toLocaleDateString()}
                                        </Typography> */}
                                        <Typography variant="caption" color={post.status === 'open' ? 'success.main' : 'text.secondary'}>
                                            Status: {post.status}
                                        </Typography>
                                        {post.status === 'open' && (
                                            <Button 
                                                variant="contained" 
                                                color="success" 
                                                fullWidth 
                                                sx={{ mt: 2 }}
                                                onClick={() => handleComplete(post.id)}
                                            >
                                              Offer Help
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Request Help Services</DialogTitle>
                <DialogContent>
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
                        onClick={handleAddPost}
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
                <DialogTitle id="offer-dialog-title">Offer Help Services</DialogTitle>
                <DialogContent>
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
                        onClick={handleAddPost}
                    >
                        Post Help Offered
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
}