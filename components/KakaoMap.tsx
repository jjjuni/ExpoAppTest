import { useEffect, useRef } from "react";
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import * as Location from "expo-location";

export function KakaoMap() {

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    const start = async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      moveMap(
        initial.coords.latitude,
        initial.coords.longitude
      );

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
        },
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          moveMap(lat, lng); // 🔥 여기 핵심
        }
      );
    };

    start();

    return () => {
      subscription?.remove();
    };
  }, []);

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.EXPO_PUBLIC_KAKAO_MAP_JS_KEY}&libraries=services"></script>
    <style>
      body { margin:0; height:100%; }
      html { height:100%; }
      #map { width:100%; height:100%; }
    </style>
  </head>

  <body>
    <div id="map"></div>

    <script>
      let map;
      let marker;

      window.onload = function () {
        map = new kakao.maps.Map(document.getElementById('map'), {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        });
      };

      document.addEventListener("message", function(event) {
        const data = JSON.parse(event.data);

        if (data.type === "MOVE") {
          const newPos = new kakao.maps.LatLng(data.latitude, data.longitude);

          if (!marker) {
            marker = new kakao.maps.Marker({
              position: newPos
            });
            marker.setMap(map);
            map.setCenter(newPos);
          } else {
            marker.setPosition(newPos);
          }
        }
      });
    </script>
  </body>
  </html>
  `;

  const webViewRef = useRef<WebView>(null);
  const isReady = useRef(false);

  const moveMap = (lat: number, lng: number) => {
    if (!isReady.current) return;

    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "MOVE",
        latitude: lat,
        longitude: lng,
      })
    );
  };

  return (
    <View className={`w-full h-full`}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        className={`flex-1`}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={() => {
          console.log('WebView loaded successfully')
          isReady.current = true;
        }}
        onError={(e) => console.error('WebView error: ', e.nativeEvent)}
        injectedJavaScript={`(function() {
          window.console.log = function(message) {
            window.ReactNativeWebView.postMessage(message);
          }
        })();`}
        onMessage={(event) => console.log(event.nativeEvent.data)}
      />
    </View>
  )
}