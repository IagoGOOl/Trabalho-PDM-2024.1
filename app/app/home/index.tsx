// app/home/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function HomeIndex() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/home/posts');
    }, []);

    return null;
}
