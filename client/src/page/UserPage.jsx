import { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";

function UserPage() {

    const { token } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Customer");

    const [createError, setCreateError] = useState("");
    const [creating, setCreating] = useState(false);

    const handleCreateUser = async (e) => {

        e.preventDefault();

        setCreateError("");

        if (!username.trim()) {
            setCreateError("Vui lòng nhập tên đăng nhập.");
            return;
        }

        if (!password) {
            setCreateError("Vui lòng nhập mật khẩu.");
            return;
        }

        if (!fullName.trim()) {
            setCreateError("Vui lòng nhập họ tên.");
            return;
        }

        try {

            setCreating(true);

            const newUser = await createUser(
                username.trim(),
                password,
                fullName.trim(),
                email.trim(),
                role,
                token
            );

            setUsers((currentUsers) => [
                ...currentUsers,
                newUser
            ]);

            setUsername("");
            setPassword("");
            setFullName("");
            setEmail("");
            setRole("Customer");

        } catch (err) {

            setCreateError(
                err.message ||
                "Không thể tạo tài khoản."
            );

        } finally {

            setCreating(false);

        }
    };

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getUsers(token);

                setUsers(data);

            } catch (err) {

                setError(
                    err.message ||
                    "Có lỗi xảy ra."
                );

            } finally {

                setLoading(false);

            }

        };

        if (token) {
            fetchUsers();
        }

    }, [token]);


    if (loading) {

        return (
            <div>
                <h1>Quản lý tài khoản</h1>
                <p>Đang tải danh sách tài khoản...</p>
            </div>
        );

    }


    if (error) {

        return (
            <div>
                <h1>Quản lý tài khoản</h1>

                <p style={{ color: "red" }}>
                    {error}
                </p>
            </div>
        );

    }


    return (

        <div>

            <h1>Quản lý tài khoản</h1>

            <p>
                Danh sách tài khoản người dùng trong hệ thống.
            </p>

            <h2>Thêm tài khoản</h2>

            <form onSubmit={handleCreateUser}>

                <div>
                    <label>Tên đăng nhập</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        placeholder="Nhập tên đăng nhập"
                        disabled={creating}
                    />
                </div>


                <div>
                    <label>Mật khẩu</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Nhập mật khẩu"
                        disabled={creating}
                    />
                </div>


                <div>
                    <label>Họ tên</label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                        placeholder="Nhập họ tên"
                        disabled={creating}
                    />
                </div>


                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Nhập email"
                        disabled={creating}
                    />
                </div>


                <div>
                    <label>Role</label>

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                        disabled={creating}
                    >
                        <option value="Customer">
                            Customer
                        </option>

                        <option value="Staff">
                            Staff
                        </option>

                        <option value="Admin">
                            Admin
                        </option>
                    </select>
                </div>


                {createError && (
                    <p style={{ color: "red" }}>
                        {createError}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={creating}
                >
                    {creating
                        ? "Đang tạo..."
                        : "Thêm tài khoản"}
                </button>

            </form>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Ngày tạo</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.UserID}>

                            <td>{user.UserID}</td>

                            <td>{user.Username}</td>

                            <td>{user.FullName}</td>

                            <td>{user.Email || "-"}</td>

                            <td>{user.Role}</td>

                            <td>{user.Status}</td>

                            <td>
                                {new Date(
                                    user.CreatedAt
                                ).toLocaleString("vi-VN")}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default UserPage;