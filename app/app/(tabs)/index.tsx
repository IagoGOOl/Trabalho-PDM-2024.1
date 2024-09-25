// app/home/index.tsx
// import React, { useEffect } from 'react';
// import { useRouter } from 'expo-router';

// export default function HomeIndex() {
//     const router = useRouter();

//     useEffect(() => {
//         router.replace('/home/posts');
//     }, []);

//     return null;
// }

// app/home/posts/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../utils/api';
import withAuth from '../../utils/withAuth';

const PostsScreen = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/post');
                setPosts(response.data);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => router.push(`/home/posts/${item.id}`)}
            style={styles.postItem}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    postItem: {
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 18,
        marginBottom: 4,
    },
    description: {
        color: '#666',
    },
});

export default withAuth(PostsScreen);

