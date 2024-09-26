import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';


interface IconContainerProps {
    focused: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: white;
    padding: 100px 16px 16px;
`;

export const ContainerGreen = styled.View`
    flex: 1;
    background-color: #56A142;
    padding: 30px 16px 16px;
`;

export const CardPost = styled.TouchableOpacity`
    background-color: #FAFAFA;
    padding: 10px;
    border-radius: 20px;
    margin: 5px 0;
    border: 1px solid #264929;
`;

export const InfoPost = styled.View`
flex-direction: row;
    align-items: center;
    padding-left: 15px;
`
export const AuthorImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px; 
  margin-right: 12px;
`;

export const AuthorName = styled.Text`
    font-size: 20px;
    font-weight: 500;
    color: #264929;
`;


export const TitlePost = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: #264929;
    padding: 15px 15px 0 15px;
    
`;


export const TextContend = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #264929;
    padding: 0 15px;
   
`;



export const TitleAuth = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: #264929;
    text-align: center;
    padding: 10px 0;
`;

export const TitleLight = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: white;
    text-align: center;
    padding: 20px 0;
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

export const IconContainer = styled.View<IconContainerProps>`
    width: 50px;
    height: 50px;
    border-radius: 25px; 
    border: solid 3px #56A142;
    background-color: ${({ focused }) => (focused ? '#ccc' : '#FFF')}; /* Cor dinâmica */
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0;
    
    
`;

export const TabIconImage = styled.Image`
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;
`;

export const TabIconUser = styled.Image`
    width: 30px;
    height: 30px;
    margin-left: 5px;
`;