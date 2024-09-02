'use client'

import { useState } from "react";
import { LoginField } from "./LoginField";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const result = await response.json();

            if (result.success) {
                login();
                router.push('/addCar');
            } else {
                setError('Username or password are incorrect');
                setTimeout(() => {
                    setError('');
                }, 3000)
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="space-y-5 w-1/3 p-5" onSubmit={handleSubmitLogin}>
            <LoginField
                htmlFor='username'
                label='Username'
                type='text'
                placeholder='Enter your username'
                value={username}
                set={setUsername}
            />
            <LoginField
                htmlFor='password'
                label='Password'
                type='password'
                placeholder='Enter your password'
                value={password}
                set={setPassword}
            />
            {error && <p className="text-red-500 font-bold">{error}</p>}
            <Button disabled={loading} className="w-full" type="submit">
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </>
                ) : (
                    'Login'
                )}
            </Button>
        </form>
    )
}
