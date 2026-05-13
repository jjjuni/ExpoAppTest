import { WebView } from 'react-native-webview';
import { View, Platform, ActivityIndicator } from 'react-native';
import { useEffect, useRef } from 'react';
import { Attractions } from '@/constants/attractions';
import { DeviceMotion } from "expo-sensors";

export default function BoardScreen() {

  const uri = process.env.EXPO_PUBLIC_WEBVIEW_URI as string;

  const webViewRef = useRef<WebView>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastShakeTime = useRef(0);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handleMessage = (
      event: MessageEvent
    ) => {

      const data =
        typeof event.data === "string"
          ? JSON.parse(event.data)
          : event.data;

      switch (data.type) {
        case "READY":
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              type: "INIT_BOARD",
              payload: Attractions,
            }),
            "*"
          );

          break;
      }
    };

    window.addEventListener(
      "message",
      handleMessage
    );

    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      );
    };
  }, []);

   useEffect(() => {
    DeviceMotion.setUpdateInterval(100);

    const subscription =
      DeviceMotion.addListener((data) => {

        const acceleration =
          data.accelerationIncludingGravity;

        if (!acceleration) return;

        const { x, y, z } = acceleration;

        const total =
          Math.abs(x ?? 0) +
          Math.abs(y ?? 0) +
          Math.abs(z ?? 0);

        const now = Date.now();

        // 1초 Debouncing
        if (
          total > 45 &&
          now - lastShakeTime.current > 1000
        ) {
          lastShakeTime.current = now;

          webViewRef.current?.postMessage(
            JSON.stringify({
              type: "ROLL_DICE",
            })
          )

        }
      });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'web' ? (
        /* 웹 플랫폼에서는 iframe을 직접 사용 */
        <iframe
          ref={iframeRef}
          src={uri}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Board Web Content"
        />
      ) : (
        /* iOS/Android 플랫폼에서는 WebView를 사용 */
        <WebView
          ref={webViewRef}
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
              <ActivityIndicator size="large" />
            </View>
          )}
          onMessage={(e) => {
            try {
              const data = JSON.parse(
                e.nativeEvent.data
              );

              switch (data.type) {
                case "READY":
                  webViewRef.current?.postMessage(
                    JSON.stringify({
                      type: "INIT_BOARD",
                      payload: Attractions,
                    })
                  )
                case "PAWN_MOVED":
                  break;
              }
            }
            catch (e) {
              console.error(e);
            }
          }}
        />
      )}
    </View>
  );
}
