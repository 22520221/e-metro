import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // =========================================
    // HANDLE LOGIN
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // Kiểm tra frontend
        if (!username.trim()) {

            setError("Vui lòng nhập tên đăng nhập.");

            return;
        }


        if (!password) {

            setError("Vui lòng nhập mật khẩu.");

            return;
        }


        try {

            setLoading(true);


            const data = await loginApi(
                username.trim(),
                password
            );

            console.log("LOGIN DATA:", data);

            // Lưu user vào AuthContext
            login(data);


            // Đăng nhập thành công
            navigate("/");


        } catch (err) {

            setError(
                err.message ||
                "Đăng nhập thất bại."
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <div className="login-page">

            <div className="login-container">

                <h1>
                    Đăng nhập
                </h1>


                <form onSubmit={handleSubmit}>

                    <div>

                        <label>
                            Tên đăng nhập
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Nhập tên đăng nhập"
                            disabled={loading}
                        />

                    </div>


                    <div>

                        <label>
                            Mật khẩu
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Nhập mật khẩu"
                            disabled={loading}
                        />

                    </div>


                    {error && (

                        <p className="login-error">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Đang đăng nhập..."
                            : "Đăng nhập"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;