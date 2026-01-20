import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';

// Import Komponen shadcn yang sudah kita install
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nim: '', password: '' });
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
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            setError("Gagal login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
            <Card className="w-full max-w-sm shadow-lg border-slate-100">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Login Mahasiswa</CardTitle>
                    <CardDescription>
                        Masukkan NIM dan password untuk masuk
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {error && (
                            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="nim">NIM</Label>
                            <Input
                                id="nim"
                                name="nim"
                                placeholder="Contoh: 4420..."
                                value={formData.nim}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="text-sm font-medium leading-none text-slate-500">
                                Ingat saya
                            </label>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                "Masuk Sekarang"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center">
                    <p className="text-sm text-slate-500">
                        Belum punya akun?{" "}
                        <Link to="/register" className="text-primary font-medium hover:underline">
                            Daftar disini
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};