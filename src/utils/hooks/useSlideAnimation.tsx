import { useRef } from 'react';
import {
    Dimensions,
    Animated
} from 'react-native';

const useSlideAnimation = () => {
    const slideValue = useRef(new Animated.Value(1)).current;
    const screenWidth = Dimensions.get('window').width;
    const slideValueParsed = slideValue.interpolate({
        inputRange: [0,1],
        outputRange: [0, screenWidth]
    })

    const slideContentAnimation = () => {
        Animated.timing(slideValue, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true
        }).start();
    }

    return { slideValueParsed, slideContentAnimation }
}

export default useSlideAnimation

