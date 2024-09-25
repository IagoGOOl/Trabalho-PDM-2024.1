import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import api from '../htpp/API';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@/components/MainTabParamList';

type Props = BottomTabScreenProps<MainTabParamList, 'Write'>;

export default function WriteScreen({ navigation }: Props) {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');

    const handlePost = async () => {
        try {
            await api.post('/post', { titulo, conteudo });
            Alert.alert('Sucesso', 'Post criado com sucesso!');
            navigation.navigate('HomeStack');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar o post.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
            <TextInput
                placeholder="Conteúdo"
                value={conteudo}
                onChangeText={setConteudo}
                multiline
                style={[styles.input, styles.textArea]}
            />
            <Button title="Publicar" onPress={handlePost} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginVertical: 8,
        borderBottomWidth: 1,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});
