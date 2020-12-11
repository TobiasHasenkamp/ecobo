
import jwtDecode from "jwt-decode";

export default function tokenValidation(token, setToken, username, setUsername, password, setPassword){

        if (token) {

            const decodedToken = jwtDecode(token);

            //test if token has expired
            if (decodedToken.exp < new Date().getTime() / 1000) {
                console.log(decodedToken.exp);
                console.log("Token has expired.")
                setToken("");
                setUsername("");
                setPassword("");
                localStorage.clear();
                return false;
            }

            return true;

        }

        return true;

}