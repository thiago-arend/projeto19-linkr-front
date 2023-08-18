import { useLocation, useNavigate } from "react-router-dom";
import { LogoutContainer, LogoutOption, NavbarContainer, NavbarTitle, UserPhotoContainer } from "../style/NavbarStyle";
import perfilImage from "../assets/profile-image.jpeg"
import { useContext, useState, useRef, useEffect } from "react";
import apiAuth from "../services/apiAuth";
import { UserContext } from "../contexts/userContext";

export default function Navbar() {
    const navigate = useNavigate();
    const [showLogoff, setShowLogoff] = useState(false);
    const { setUser, user } = useContext(UserContext);

    const useOutsideClick = (callback) => {
        const ref = useRef();

        useEffect(() => {
            const handleClick = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick);
            };
        }, [ref]);

        return ref;
    };
    const ref = useOutsideClick(handleOutsideClick);

    function handleClick() {
        setShowLogoff(!showLogoff);
    }

    function handleOutsideClick() {
        setShowLogoff(false);
    }

    function logOff() {

        /* --- OBS: Essa função depende da implementação do login --- */
        apiAuth.signOut(user.token)
            .then(() => {
                localStorage.removeItem("user");
                setUser(undefined);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    return (
        <NavbarContainer>
            <NavbarTitle>linkr</NavbarTitle>
            <LogoutContainer ref={ref}>
                <ion-icon onClick={handleClick} name={showLogoff ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
                <UserPhotoContainer onClick={handleClick} src={perfilImage} />
                <LogoutOption  onClick={logOff} showLogoff={showLogoff}>Logout</LogoutOption>
            </LogoutContainer>
        </NavbarContainer>
    )
}