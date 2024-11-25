import {
    Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, TextField, Box, Grid, useMediaQuery, useTheme
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ADD_POST, REMOVE_HELP_BOARD } from "../../utils/mutations";
import { FIND_ALL_POST } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
    CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const initialPost: Omit<Post, 'id'> = {
    title: '',
    description: '',
    date: '',
    type: 'needed',
    status: '',
    createdBy: '',
    completedBy: '',
}

export default function HelpBoard() {
    useAuth();

    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = useState(false);
    const [openOffered, setOpenOffered] = useState(false);
    const [newPost, setNewPost] = useState<Omit<Post, 'id'>>(initialPost);
    const { loading, error, data, refetch } = useQuery(FIND_ALL_POST);

    const [addHelpBoard] = useMutation(ADD_POST);
    const [removeHelpBoard] = useMutation(REMOVE_HELP_BOARD);

    const help = useMemo(() => {
        return {
            helpNeeded: data?.findAllHelpBoards.filter((help: Post) => (help.type === 'needed')),
            helpOffered: data?.findAllHelpBoards.filter((help: Post) => (help.type === 'offered'))
        }
    }, [data]);

    const handleAdd = (post: Omit<Post, 'id'>) => {
        addHelpBoard({
            variables: {
                input: { title: post.title, description: post.description, date: post.date, status: 'open', createdBy: post.createdBy, completedBy: post.completedBy, type: post.type },
            },
        })
    };

    const handleAddPost = (type: 'needed' | 'offered') => {
        const post = { title: newPost.title, description: newPost.description, date: newPost.date, type, status: newPost.status, createdBy: newPost.createdBy, completedBy: newPost.completedBy }
        console.log(post);
        handleAdd(post);
        setNewPost(initialPost);
        setOpen(false);
        setOpenOffered(false);
        navigate(0);
    };
    const handleRemove = (helpBoardId: string) => {
        removeHelpBoard({
            variables: { helpBoardId },
        }).then(() => {
            refetch();
        });
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!data) return (
        <Box>
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

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ backgroundColor: '#34471f', color: 'white', textAlign: 'center' }}>Request Help Services</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#698f3f' }}>
                    <TextField
                        fullWidth
                        label="Post Title"
                        margin="normal"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Description of Help Needed"
                        margin="normal"
                        multiline
                        rows={4}
                        value={newPost.description}
                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Date Help is Needed"
                        margin="normal"
                        type="date"
                        value={newPost.date}
                        onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
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
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        autoFocus
                    />
                    <TextField
                        fullWidth
                        label="Description of Help Offered"
                        margin="normal"
                        multiline
                        rows={4}
                        value={newPost.description}
                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Date Help is Available"
                        margin="normal"
                        type="date"
                        value={newPost.date}
                        onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
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
    )
    console.log(data);

    return (
        <Box>
            {loading && <Typography>Loading...</Typography>}

            {error && <Typography>Error: {error.message}</Typography>}

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

                                {help.helpNeeded.map((post: any) => (
                                    <Card key={post._id + 'helpNeeded'} sx={{ backgroundColor: post.status === 'open' ? '#e7decd' : '#34471f', mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" color="#698f3f" sx={{ textAlign: 'center' }}>{post.title}</Typography>
                                            <Typography variant="body1" color='black' sx={{ textAlign: 'center' }}>{post.description}</Typography>
                                            {/* <Typography variant="h6" color="#34471f" sx={{ textAlign: 'center' }}>{getLabel(post.type)}{post.date}</Typography> */}
                                            <Typography variant="caption" color={post.status === 'open' ? 'success.main' : 'text.secondary'} sx={{ textAlign: 'center' }}>
                                                Status: {post.status}
                                            </Typography>
                                            {post.status === 'open' && (
                                                <Box>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        fullWidth
                                                        sx={{ mt: 2 }}
                                                    // onClick={() => handleComplete(post.id)}
                                                    >
                                                        Offer Help

                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        fullWidth
                                                        sx={{ mt: 2 }}
                                                        onClick={() => handleRemove(post._id)}
                                                    >
                                                        Remove Post
                                                    </Button>
                                                </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </Grid>
                            <Grid item xs={10} md={3}>

                                {help.helpOffered.map((post: any) => (
                                    <Card key={post._id + 'helpOffered'} sx={{ backgroundColor: post.status === 'open' ? '#e7decd' : '#34471f', mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" color="#698f3f" sx={{ textAlign: 'center' }}>{post.title}</Typography>
                                            <Typography variant="body1" color='black' sx={{ textAlign: 'center' }}>{post.description}</Typography>
                                            {/* <Typography variant="h6" color="#34471f" sx={{ textAlign: 'center' }}>{getLabel(post.type)}{post.date}</Typography> */}
                                            <Typography variant="caption" color={post.status === 'open' ? 'success.main' : 'text.secondary'} sx={{ textAlign: 'center' }}>
                                                Status: {post.status}
                                            </Typography>
                                            {post.status === 'open' && (
                                               <Box>
                                                 <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    fullWidth
                                                    sx={{ mt: 2 }}
                                                // onClick={() => handleComplete(post.id)}
                                                >
                                                    Accept Help
                                                </Button>
                                                  <Button
                                                  variant="contained"
                                                  color="secondary"
                                                  fullWidth
                                                  sx={{ mt: 2 }}
                                                  onClick={() => handleRemove(post._id)}
                                              >
                                                  Remove Post
                                              </Button>
                                          </Box>
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
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Description of Help Needed"
                            margin="normal"
                            multiline
                            rows={4}
                            value={newPost.description}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Date Help is Needed"
                            margin="normal"
                            type="date"
                            value={newPost.date}
                            onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
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
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            label="Description of Help Offered"
                            margin="normal"
                            multiline
                            rows={4}
                            value={newPost.description}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Date Help is Available"
                            margin="normal"
                            type="date"
                            value={newPost.date}
                            onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
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
        </Box>
    );
}
