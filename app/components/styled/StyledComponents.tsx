import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';


interface IconContainerProps {
    focused: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: white;
    padding: 100px 16px 16px;
`;

export const ContainerMap = styled.View`
    flex: 1;
    background-color: white;
    padding: 30px 16px 16px;
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
`;
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
export const TextContendDetails = styled.Text`
    font-size: 18px;
    font-weight: 600;
    color: #264929;
    padding: 15px 0;
   
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

export const TitleGreen = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #56A142;
    text-align: center;
    padding: 20px 0;
`;

export const TitleGreenLight = styled.Text`
    font-size: 25px;
    color: #56A142;
    text-align: center;
`;

export const TextGreen= styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #56A142;
    padding-top: 10px;
`;

export const ButtonGreen = styled.TouchableOpacity`
    background-color: #56A142;
    color: white;
    padding: 15px 20px;
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
  //height: 50px;
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

export const ButtonEdit = styled.TouchableOpacity`
  padding: 8px;
    align-items: center; 
    border-radius: 5px;
    border: solid 2px #56A142;
    flex-direction: row;
    gap: 5px;
`;

export const ButtonTrash = styled.TouchableOpacity`
  padding: 8px;
    align-items: center; 
    color: #FF7256;
    border-radius: 5px;
    border: solid 2px #FF7256;
    flex-direction: row;
    gap: 5px;

`;

// Commment and Post
export const BoxComments = styled.View`
    border: solid 2px #56A142;
    color: #56A142;
    border-radius: 20px;
    padding: 10px;
    margin: 5px 0;
`;

export const BoxContendComments = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
`;



export const TextRed= styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #FF7256;
    padding-top: 10px;
`;



export const BoxEdtDelete = styled.View`
    gap: 10px;
`;

export const BoxEdtDeleteProfile = styled.View`
    gap: 10px;
    flex-direction: row;
    justify-content: space-around;
`;

export const TitlePostProfile = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: #264929;
    text-align: center;
    padding: 5px 0;
    text-transform: capitalize;
    
`;

export const AuthorImageComment = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 20px;
 
`;


export const TextContendComment = styled.Text`
    font-size: 18px;
    font-weight: 600;
    color: #264929;
    padding: 0 15px;
    max-width: 300px;
   
`;


// perfil
export const ContainerProfile = styled.View`
    flex: 1;
    background-color: white;
    padding: 100px 16px 16px;
`;

export const TitleGreenProfile = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #56A142;
    text-align: center;
    padding: 5px 0;
`;



export const ButtonSettings = styled.TouchableOpacity`
  padding: 8px;
    align-items: center; 
    border-radius: 5px;
    border: solid 2px #56A142;
    flex-direction: row;
    gap: 5px;
`;

export const ButtonLogout = styled.TouchableOpacity`
  padding: 8px;
    align-items: center; 
    color: #FF7256;
    border-radius: 5px;
    border: solid 2px #FF7256;
    flex-direction: row;
    gap: 5px;

`;

8
