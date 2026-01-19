import React, { useState } from 'react';
import { Button, Label, TextInput, Card, Alert } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nim: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login gagal');
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/dashboard');
            }

        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan pada server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="max-w-md w-full shadow-xl border-t-4 border-blue-600">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Selamat Datang 👋</h2>
                    <p className="text-sm text-gray-500">Silakan login menggunakan NIM & Password</p>
                </div>

                {error && (
                    <Alert color="failure" icon={AlertCircle} className="mb-4">
                        <span className="font-medium">{error}</span>
                    </Alert>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nim">NIM</Label>
                        </div>
                        <TextInput
                            id="nim"
                            name="nim"
                            type="text"
                            placeholder="Contoh: 4420..."
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <div className="mb-2 block">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <div className="relative">
                            <TextInput
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                onChange={handleChange}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Masuk...</span>
                            </div>
                        ) : (
                            'Login'
                        )}
                    </Button>

                    <p className="text-sm text-center text-gray-500 mt-2">
                        Belum punya akun? <Link to="/register" className="text-blue-600 hover:underline font-medium">Daftar disini</Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};
