import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, updateUserStatus } from "../services/userService";
import { useAuth } from "../context/AuthContext";

function UserPage() {

    const { token } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Customer");

    const [createError, setCreateError] = useState("");
    const [creating, setCreating] = useState(false);

    const loadUsers = async () => {
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

    const handleToggleStatus = async (user) => {
        try {
            setCreating(true);
            setCreateError("");

            const newStatus =
                user.Status === "Active"
                    ? "Inactive"
                    : "Active";

            await updateUserStatus(
                user.UserID,
                newStatus,
                token
            );

            alert(
                newStatus === "Active"
                    ? "Kích hoạt tài khoản thành công."
                    : "Vô hiệu hóa tài khoản thành công."
            );

            await loadUsers();
        } catch (error) {
            setCreateError(error.message);
        } finally {
            setCreating(false);
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.UserID);
        setUsername(user.Username);
        setFullName(user.FullName);
        setEmail(user.Email || "");
        setRole(user.Role);
    };

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setFullName("");
        setEmail("");
        setRole("Customer");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setCreating(true);
        setCreateError("");

        if (editingId === null) {
            await createUser(
                username,
                password,
                fullName,
                email,
                role,
                token
            );

            alert("Thêm người dùng thành công.");
            resetForm();
            await loadUsers();

        } else {
            await updateUser(
                editingId,
                username,
                fullName,
                email,
                role,
                token
            );

            alert("Cập nhật người dùng thành công.");

            resetForm();
            await loadUsers();
        }
    } catch (error) {
        setCreateError(error.message);  
    }

    finally {
        setCreating(false);
    }
};

    useEffect(() => {
        if (token) {
            loadUsers();
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

            <form onSubmit={handleSubmit}>

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

                {editingId === null && (
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
                )}

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
                        ? "Đang xử lý..."
                        : editingId === null
                            ? "Thêm tài khoản"
                            : "Cập nhật tài khoản"}
                </button>

                {editingId !== null && (
                    <button
                        type="button"
                        onClick={resetForm}
                        disabled={creating}
                    >
                        Hủy
                    </button>
                )}

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
                        <th>Hành động</th>
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

                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleEdit(user)}
                                    disabled={creating}
                                >
                                    Sửa
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleToggleStatus(user)}
                                    disabled={creating}
                                >
                                    {user.Status === "Active"
                                        ? "Vô hiệu hóa"
                                        : "Kích hoạt"}
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default UserPage;