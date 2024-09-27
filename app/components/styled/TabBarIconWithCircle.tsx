import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { IconContainer, TabIconImage } from './StyledComponents';

interface TabBarIconWithCircleProps {
    focused: boolean;
    icon: ImageSourcePropType;

}

const TabBarIconWithCircle: React.FC<TabBarIconWithCircleProps> = ({
                                                                       focused,
                                                                       icon,
                                                                   }) => {
    return (
        <IconContainer
            focused={focused}
            accessible={true}
            accessibilityRole="button"
        >
            <TabIconImage source={icon} resizeMode="contain" />
        </IconContainer>
    );
};

export default TabBarIconWithCircle;
