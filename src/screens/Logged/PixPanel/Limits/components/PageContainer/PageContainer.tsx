import React from 'react';
import { Platform, StatusBar, View } from 'react-native';

// import { Container } from './styles';

const PageContainer = ({ children, hiddenBalanceInfo }) => {
    console.log(StatusBar.currentHeight);
    const androidPaddingTop = StatusBar.currentHeight
        ? StatusBar.currentHeight + 150
        : 170;
    return (
        <View
            style={{
                flex: 1,
                paddingLeft: 27,
                paddingRight: 23,
                paddingTop: Platform.select({
                    ios: hiddenBalanceInfo ? 150 : 220,
                    android: hiddenBalanceInfo
                        ? androidPaddingTop - 60
                        : androidPaddingTop
                }),
                paddingBottom: 30
            }}
        >
            {children}
        </View>
    );
};

export default PageContainer;
