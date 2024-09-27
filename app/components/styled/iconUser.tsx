import React from 'react';
import { ImageSourcePropType } from 'react-native';
import {IconContainer, TabIconImage, TabIconUser} from './StyledComponents';

interface TabBarIconWithCircleProps {
    focused: boolean;
    icon: ImageSourcePropType;

}

const TabBarIconUser: React.FC<TabBarIconWithCircleProps> = ({
                                                                       focused,
                                                                       icon,
                                                                   }) => {
    return (
        <IconContainer
            focused={focused}
            accessible={true}
            accessibilityRole="button"
        >
            <TabIconUser source={icon} resizeMode="contain" />
        </IconContainer>
    );
};

export default TabBarIconUser;
