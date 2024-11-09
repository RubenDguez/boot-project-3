import { Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function Main() {
    useAuth();
    return (
        <Typography>This is the Main page</Typography>
    )
}
