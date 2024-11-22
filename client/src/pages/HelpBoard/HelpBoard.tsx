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
    const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'status' | 'createdBy' | 'completedBy'>>({
        title: '',
        description: '',
        date: '',
        type: 'needed'
    });

    const handleAddPost = (type: 'needed' | 'offered') => {
            const Post: Post = {
                id: Date.now().toString(),
                ...newPost,
                status: 'open',
                type,
                createdBy: 'currentUser', // You'll want to get this from your auth context
            };
            setPosts([...Posts, Post]);
            setOpen(false);
            setOpenOffered(false);
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
        <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                           
                            {Posts.filter(post => post.type === 'needed').map((post) => (
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
                                                    onClick={() => handleComplete(post.id)}
                                                >
                                                  Offer Help
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                            ))}
                            </Grid>
                            <Grid item xs={10} md={3}>
                               
                                {Posts.filter(post => post.type === 'offered').map((post) => (
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
                                                    onClick={() => handleComplete(post.id)}
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
}
