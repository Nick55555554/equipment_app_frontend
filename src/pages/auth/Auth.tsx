import { useNavigate } from "react-router";
import useAuth from "../../components/hooks/useAuth";
import "./auth.css"
import { url } from "../../config";
import { useState } from "react";

const Auth:React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {setIsAuthenticated} = useAuth();

    const handleClick = async() => {
        setLoading(true);
        setError(null);
        const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        }
        
        try {
            const response = await fetch(`${url}/auth/sign-in`, requestOption);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            document.cookie = `authToken=${data.token}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/`;

            
            setIsAuthenticated(true);
            const personStatus = data.userRole;
            console.log(personStatus);
            
            switch(personStatus){
                case "ROLE_ADMIN":
                    navigate('/admin');
                    break;
                case "ROLE_UNIT_MANAGER":
                    navigate('/');
                    break;
                case "ROLE_DISPATCHER":
                    navigate('/dispatcher');
                    break;
            }         
        } catch(error) {
            console.log("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }
    
    

    return (
        <div className="window">
            <div className="auth">
                <label className="label">
                    Вход в аккаунт
                </label>
                <div className="buttons"> 
                    <input placeholder="Логин" 
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                    className="vvod"></input>
                    <input placeholder="Пароль"  className="vvod"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    ></input>
                    <button className="vhod" onClick={handleClick} disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                    </button>
                    {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
                    <div className="forForgottens">
                        <span className="small_label">Забыли пароль?</span>
                        <span className="text">Обращайтесь к администратору:</span>
                        <span className="text">8-800-555-35-35</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Auth;