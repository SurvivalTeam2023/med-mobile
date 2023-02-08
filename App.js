import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import LoadingScreen from "./components/loadingScreen";
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import searchScreen from "./screens/search/searchScreen";
import tracksScreen from "./screens/tracks/tracksScreen";
import nowPlayingScreen from "./screens/nowPlaying/nowPlayingScreen";
import topArtistScreen from "./screens/topArtist/topArtistScreen";
import exploreSubscription from "./screens/exploreSubscription/exploreSubscription";
import paymentFailedScreen from "./screens/paymentFailed/paymentFailedScreen";
import signinScreen from "./screens/auth/signinScreen";
import signupScreen from "./screens/auth/signupScreen";
import chooseMusicScreen from "./screens/chooseMusic/chooseMusicScreen";
import splashScreen from "./screens/splashScreen";
import { store } from "./core/store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import ExploreScreen from "./screens/explore/exploreScreen";
import PaymentScreen from "./screens/payment/paymentScreen";
import SubscribeScreen from "./screens/subscribe/subscribeScreen";

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen
              name="Splash"
              component={splashScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen
              name="Signin"
              component={signinScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen name="SignUp" component={signupScreen} />
            <Stack.Screen name="SignIn" component={signinScreen} />
            <Stack.Screen name="ChooseMusic" component={chooseMusicScreen} />
            <Stack.Screen
              name="BottomTabBar"
              component={bottomTabBarScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen name="Search" component={searchScreen} />
            <Stack.Screen name="Tracks" component={tracksScreen} />
            <Stack.Screen name="HomePage" component={ExploreScreen} />
            <Stack.Screen
              name="NowPlaying"
              component={nowPlayingScreen}
              sharedElements={(route, otherRoute, showing) => {
                const item = route.params.item;
                return [item.id];
              }}
            />
            <Stack.Screen
              name="TopArtist"
              component={topArtistScreen}
              sharedElements={(route, otherRoute, showing) => {
                const item = route.params.item;
                return [item.id];
              }}
            />

            <Stack.Screen name="Subscribe" component={SubscribeScreen} />

            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen
              name="ExploreSubscription"
              component={exploreSubscription}
            />
            <Stack.Screen
              name="PaymentFailed"
              component={paymentFailedScreen}
            />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
