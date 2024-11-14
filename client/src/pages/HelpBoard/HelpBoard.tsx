import { Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function HelpBoard() {
    useAuth();
    return (
        <Typography variant="h2">Help Board</Typography>
    )
}
