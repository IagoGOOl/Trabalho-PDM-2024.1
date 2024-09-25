import React, {useEffect, useState} from 'react';
import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import api from '../htpp/API';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ProfileStackParamList} from "@/app/ProfileStackNavigator";

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;
type User = {
    nome: string;
    email: string;
    image?: string;
};

type Post = {
    id: number;
    titulo: string;
};

export default function ProfileScreen({ navigation }: Props) {
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await api.get<User>('/user/me');
                setUser(userResponse.data);

                const postsResponse = await api.get<Post[]>('/post/user');
                setPosts(postsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, []);

    const renderItem = ({ item }: { item: Post }) => (
        <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id, isUserPost: true })}
        >
            <Text>{item.titulo}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {user && (
                <>
                    {user.image && <Image source={{ uri: user.image }} style={styles.profileImage} />}
                    <Text style={styles.userName}>Nome: {user.nome}</Text>
                    <Text>Email: {user.email}</Text>
                    <Button title="Configurações" onPress={() => navigation.navigate('Settings')} />
                    <Text style={styles.postsTitle}>Meus Posts:</Text>
                    <FlatList data={posts} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postsTitle: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },
    postItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
    },
});
