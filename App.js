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
import QuizScreen from "./screens/quiz/quizScreen";
import ResultScreen from "./screens/quiz/resultScreen";
import QuestionScreen from "./screens/quiz/questionScreen";
import ManageArtistAlbumScreen from "./screens/manageAlbum/manageAlbum";
import artistTracksScreen from "./screens/manageAlbum/artistTrack";
import CreateAlbumScreen from "./screens/createAlbum/createAlbumScreen";
import CreateAudioArtistScreen from "./screens/createAudioArtist/createAudioArtistScreen";
import SelectGenreArtistScreen from "./screens/manageAlbum/selectGenreArtist";
import DeleteAlbumArtist from "./screens/manageAlbum/deleteAlbumArtist";
import genreTracksScreen from "./screens/tracks/genreTracksScreen";
import OptionScreen from "./screens/optionScreen/selectScreen";
import ShowCamScreen from "./screens/optionScreen/showCam";
import CamResultScreen from "./screens/optionScreen/camResult";
import profileScreen from "./screens/Profile/profileScreen";
import ProfileArtistScreen from "./screens/artistProfile/profileArtist";
import NotifyEmail from "./screens/auth/evrifyEmail";
import editProfileScreen from "./screens/Profile/editProfileScreen";

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
            <Stack.Screen name="OptionScreen" component={OptionScreen} />
            <Stack.Screen name="ShowCam" component={ShowCamScreen} />

            <Stack.Screen name="CamResult" component={CamResultScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="GenreTracks" component={genreTracksScreen} />
            <Stack.Screen name="ChooseMusic" component={chooseMusicScreen} />
            <Stack.Screen
              name="ManageArtistAlbum"
              component={ManageArtistAlbumScreen}
            />

            <Stack.Screen name="ArtistTrack" component={artistTracksScreen} />
            <Stack.Screen
              name="CreateAudioArtist"
              component={CreateAudioArtistScreen}
            />
            <Stack.Screen name="CreateAlbum" component={CreateAlbumScreen} />
            <Stack.Screen name="Profile" component={profileScreen} />
            <Stack.Screen
              name="DeleteAlbumArtist"
              component={DeleteAlbumArtist}
            />
            <Stack.Screen
              name="SelectGenreArtist"
              component={SelectGenreArtistScreen}
            />
            <Stack.Screen name="Question" component={QuestionScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="NotifyEmail" component={NotifyEmail} />
            <Stack.Screen
              name="BottomTabBar"
              component={bottomTabBarScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
            <Stack.Screen name="Search" component={searchScreen} />
            <Stack.Screen name="Tracks" component={tracksScreen} />
            <Stack.Screen name="HomePage" component={ExploreScreen} />
            <Stack.Screen name="editScreen" component={editProfileScreen} />
            <Stack.Screen
              name="ArtistProfile"
              component={ProfileArtistScreen}
            />
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
