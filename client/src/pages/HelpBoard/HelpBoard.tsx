import { 
  Typography, 
  Card, 
  CardContent, 
 Grid2, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  TextField,
  Box
} from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

interface Post {
  id: string;
  title: string;
  description: string;
  payment: string;
  status: 'open' | 'completed';
  createdBy: string;
  completedBy?: string;
}

export default function HelpBoard() {
    useAuth();
    const [Posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        payment: ''
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
        setNewPost({ title: '', description: '', payment: '' });
    };

    const handleComplete = (PostId: string) => {
        setPosts(Posts.map(Post => 
            Post.id === PostId 
                ? { ...Post, status: 'completed', completedBy: 'currentUser' }
                : Post
        ));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Grid2 container spacing={3}>
                <Grid2 item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h2">Help Board</Typography>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Post New Post
                    </Button>
                </Grid2>
                
                <Grid2 item xs={12}>
                    <Grid2 container spacing={2}>
                        {Posts.map((Post) => (
                            <Grid2 item xs={12} md={6} lg={4} key={Post.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5">{Post.title}</Typography>
                                        <Typography variant="body1">{Post.description}</Typography>
                                        <Typography variant="h6" color="primary">
                                            ${Post.payment}
                                        </Typography>
                                        <Typography variant="caption" color={Post.status === 'open' ? 'success.main' : 'text.secondary'}>
                                            Status: {Post.status}
                                        </Typography>
                                        {Post.status === 'open' && (
                                            <Button 
                                                variant="contained" 
                                                color="success" 
                                                fullWidth 
                                                sx={{ mt: 2 }}
                                                onClick={() => handleComplete(Post.id)}
                                            >
                                                Complete Post
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>
            </Grid2>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Post New Post</DialogTitle>
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
                        label="Description"
                        margin="normal"
                        multiline
                        rows={4}
                        value={newPost.description}
                        onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Payment Amount"
                        margin="normal"
                        type="number"
                        value={newPost.payment}
                        onChange={(e) => setNewPost({...newPost, payment: e.target.value})}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                        onClick={handleAddPost}
                    >
                        Post Post
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
}