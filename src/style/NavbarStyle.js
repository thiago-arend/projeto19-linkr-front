import styled from "styled-components";

export const NavbarContainer = styled.div`
    z-index: 1;
    position: fixed;
    padding: 0 20px;
    top: 0;
    left: 0;
    width: 100%;
    height: 72px;
    background-color: #151515;
    color: #FFF;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const NavbarTitle = styled.h1`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    font-weight: bold;
    color: #FFF;
`;

export const LogoutContainer = styled.div`
    position: relative;
    margin-right: 39px;
    width: 90px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    ion-icon {
        color: #fff;
        width: 30px;
        height: 30px;

        &:hover {
            cursor: pointer;
        }
    }
`;

export const UserPhotoContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => props.src});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
            cursor: pointer;
    }
`;

export const LogoutOption = styled.div`
    position: absolute;
    left: -40px;
    top: 61px;
    display: ${props => props.showLogoff ? "flex" : "none"};
    justify-content: center;
    align-items: center;

    width: 150px;
    height: 43px;
    border-bottom-left-radius: 20px;
    background-color: #171717;

    color: #FFF;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }
`;