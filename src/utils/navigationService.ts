import React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

import { UserStackList } from '../routes/Logged/types';

export const navigationRef = React.createRef<NavigationContainerRef>();

interface INavigationService<T extends keyof UserStackList> {
    name: T;
    params: UserStackList[T];
}

export function navigate(
    name: keyof UserStackList,
    params: UserStackList[keyof UserStackList]
) {
    if (navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}

export function popToTop() {
    if (navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.dispatch(StackActions.popToTop());
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
