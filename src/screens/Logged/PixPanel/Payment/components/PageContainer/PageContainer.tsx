/* eslint-disable react/require-default-props */
import React from 'react';
import { Platform, StatusBar, View } from 'react-native';

// import { Container } from './styles';

interface PageContainerProps {
    children: React.ReactNode[] | React.ReactNode;
    hiddenBalanceInfo?: boolean;
}
const PageContainer = ({ children, hiddenBalanceInfo }: PageContainerProps) => {
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
