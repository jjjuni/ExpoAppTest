import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

export default function MoreScreen() {
  return (
    <SafeAreaView className={`flex-1`} edges={['top']}>
      <View className={`w-full h-full`}>
        <WebView source={{ uri: 'https://junhee-portfolio.vercel.app/' }}
          onMessage={(event) => { }} />
      </View>
    </SafeAreaView>
  );
}