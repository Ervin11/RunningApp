import React from "react";
import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import createBottomTabNavigator from "react-navigation-tabs/src/navigators/createBottomTabNavigator";


import LoginScreen from '../view/Login';
import InscriptionScreen from '../view/Inscription';
import ForgotPasswordScreen from '../view/ForgotPassword';
import Activity from "../view/Activity";
import Home from '../view/Home'
import Icon from "react-native-vector-icons/FontAwesome5";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createAppContainer(createStackNavigator({
    SignIn: {
        screen: LoginScreen,
        navigationOptions: {
            title: "Sign In",
            headerStyle,
            header: null
        }
    },
    SignUp: {
        screen: InscriptionScreen,
        navigationOptions: {
            title: "Sign Up",
            headerStyle,
            header: null
        }
    }
}));

export const SignedIn = createAppContainer(createBottomTabNavigator(
    {
        Activités: {
            screen: Activity,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="list" size={25} color={tintColor} />
                )
            }
        },
        Course: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="walking" size={25} color={tintColor} />
                )
            }
        },
        Profile: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="user-alt" size={25} color={tintColor} />
                )
            }
        },
    },
    {
        initialRouteName: 'Course',
        tabBarOptions: {
            style: {
                activeTintColor: '#2C5077'
            }
        }
    }
));

export const createRootNavigator = (signedIn = false) => {
    return createAppContainer(createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    ));
};