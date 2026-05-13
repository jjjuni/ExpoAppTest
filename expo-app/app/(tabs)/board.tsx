import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { View, Platform, ActivityIndicator } from 'react-native';

export default function BoardScreen() {

  const uri = process.env.EXPO_PUBLIC_WEBVIEW_URI as string;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {Platform.OS === 'web' ? (
          /* 웹 플랫폼에서는 iframe을 직접 사용합니다. */
          <iframe
            src={uri}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Board Web Content"
          />
        ) : (
          /* iOS/Android 플랫폼에서는 WebView를 사용합니다. */
          <WebView
            source={{ uri }}
            style={{ flex: 1 }}
            originWhitelist={['*']}
            javaScriptEnabled
            domStorageEnabled
            mixedContentMode="always"
            cacheEnabled
            androidLayerType='hardware'
            renderLoading={() => (
              <View className={`flex justify-center items-center`}>
                <ActivityIndicator size="large"/>
              </View>
            )}
            onMessage={(e) => {
              try {
                const data = JSON.parse(
                  e.nativeEvent.data
                );
                console.log(data);
              }
              catch (e) {
                console.error(e);
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
