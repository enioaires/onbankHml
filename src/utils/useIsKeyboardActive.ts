import { useState, useEffect } from 'react';
import { Keyboard, Animated } from 'react-native';

export default function useIsKeyboardActive(animateTo?: number) {
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [offset] = useState(new Animated.Value(0));

    const activeKeyboard = (event: any) => {
        setIsKeyboardActive(true);
        setKeyboardHeight(event.endCoordinates.height);
        if (animateTo) {
            Animated.timing(offset, {
                toValue: animateTo!,
                duration: 100,
                useNativeDriver: false
            }).start();
        }
    };

    const hideKeyboard = () => {
        setIsKeyboardActive(false);
        setKeyboardHeight(0);
        if (animateTo) {
            Animated.timing(offset, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start();
        }
    };

    useEffect(() => {
        const keyboardDidshow = Keyboard.addListener(
            'keyboardDidShow',
            activeKeyboard
        );
        const keyboardDidHide = Keyboard.addListener(
            'keyboardDidHide',
            hideKeyboard
        );

        return () => {
            keyboardDidshow.remove();
            keyboardDidHide.remove();
        };
    }, []);

    return { isKeyboardActive, offset, keyboardHeight };
}
