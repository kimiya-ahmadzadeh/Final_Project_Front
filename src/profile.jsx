import "../styles/profile.css";
import { Button, TextField } from "@mui/material";
import { Header } from "./header";

export function Profile() {
    const user = {
        firstName: "USer1", lastName: "UUUSer1", bio: "Bio for test",
        userName: "Username1", password: "pass1"
    }
    return (
        <div className="profile">
            <Header />
            <div className="profile-card">
                <div className="profile-pic">PICTURE</div>
                <div className="profile-info">
                    <div className="personal-info">
                        <TextField variant="outlined" label="First Name" defaultValue={user.firstName} />
                        <TextField variant="outlined" label="Last Name" defaultValue={user.lastName} />
                        <TextField variant="outlined" label="Bio" defaultValue={user.bio} />
                    </div>
                    <div className="login-info">
                        <TextField variant="outlined" label="User Name" defaultValue={user.userName} />
                        <TextField variant="outlined" label="Password" defaultValue={user.password} type="password" />
                        <Button variant="outlined">Confirm Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}