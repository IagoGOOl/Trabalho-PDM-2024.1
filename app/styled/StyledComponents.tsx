import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
    flex: 1;
    background-color: white;
    padding: 100px 16px 16px;
`;

export const TitleAuth = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: #264929;
    text-align: center;
    padding: 10px 0;
`;

export const ButtonGreen = styled.TouchableOpacity`
    background-color: #56A142;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    margin-top: 20px;
    align-items: center; 
`;


export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;


export const Input = styled.TextInput`
  height: 50px;
  border-width: 1px;
  border-color: #BDBDBD;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 20px;
  font-size: 16px;
  background-color: #F6F6F6;

`;

export const LinkText = styled.Text`
  color: #56A142; 
  text-decoration:none;
    font-weight: 900;
  font-size: 16px;
    margin: 0;
    padding: 0;
`;

export const LinkWrapper = styled(TouchableOpacity)`
    margin: 0;
    padding: 0;
`;

export const BoxLink = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;

`;

export const TextGray = styled.Text`
    color: #666666;
    font-size: 16px;
`;
