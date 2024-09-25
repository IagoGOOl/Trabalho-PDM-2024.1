import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import api from '../htpp/API';
import {HomeStackParamList} from "@/components/HomeStackNavigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

type Post = {
    id: number;
    titulo: string;
    conteudo: string;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;
export default function HomeScreen({ navigation }: Props) {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get<Post[]>('/post');
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);

    const renderItem = ({ item }: { item: Post }) => (
        <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
        >
            <Text style={styles.postTitle}>{item.titulo}</Text>
            <Text style={styles.postContent}>{item.conteudo.substring(0, 100)}...</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList data={posts} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    postItem: {
        marginBottom: 16,
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    postTitle: {
        fontWeight: 'bold',
    },
    postContent: {
        color: 'gray',
    },
});
