import { Link, useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import { getAuth, signOut } from "firebase/auth";

const NavBar = () => {

    const { user } = useUser();
    const navigate = useNavigate();

    const logout = async ()=>{
        await signOut(getAuth());
        navigate('/');
    }

    return (
        <nav>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>

                <li>
                {user
                    ? <button onClick={logout}>Logout</button>
                    :   <ul>
                            <li>
                                <Link to="/login">Log in</Link>
                            </li>
                            <li>
                                <Link to="/create-account">Create an acount</Link>
                            </li>
                        </ul>
                }
                </li>


            </ul>

        </nav>
    )
}

export default NavBar;