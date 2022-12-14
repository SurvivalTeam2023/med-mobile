import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LoadingScreen from "./components/loadingScreen";
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import searchScreen from "./screens/search/searchScreen";
import tracksScreen from "./screens/tracks/tracksScreen";
import nowPlayingScreen from "./screens/nowPlaying/nowPlayingScreen";
import topArtistScreen from "./screens/topArtist/topArtistScreen";
import subscribeScreen from "./screens/subscribe/subscribeScreen";
import exploreSubscription from "./screens/exploreSubscription/exploreSubscription";
import paymentFailedScreen from "./screens/paymentFailed/paymentFailedScreen";
import signinScreen from "./screens/auth/signinScreen";
import signupScreen from "./screens/auth/signupScreen";
import chooseMusicScreen from "./screens/chooseMusic/chooseMusicScreen";
import splashScreen from "./screens/splashScreen";

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={splashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Signin" component={signinScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Signup" component={signupScreen} />
        <Stack.Screen name="ChooseMusic" component={chooseMusicScreen} />
        <Stack.Screen name="BottomTabBar" component={bottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Search" component={searchScreen} />
        <Stack.Screen name="Tracks" component={tracksScreen} />
        <Stack.Screen name="NowPlaying" component={nowPlayingScreen}
          sharedElements={(route, otherRoute, showing) => {
            const item = route.params.item;
            return [item.id];
          }}
        />
        <Stack.Screen name="TopArtist" component={topArtistScreen}
          sharedElements={(route, otherRoute, showing) => {
            const item = route.params.item;
            return [item.id];
          }}
        />
        <Stack.Screen name="Subscribe" component={subscribeScreen} />
        <Stack.Screen name="ExploreSubscription" component={exploreSubscription} />
        <Stack.Screen name="PaymentFailed" component={paymentFailedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;