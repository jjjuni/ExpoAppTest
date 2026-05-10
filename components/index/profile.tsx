import { Text, View } from "react-native";

export function Profile (props: { name: string}) {
  return (
    <View className={`flex flex-col gap-2`}>
      <View className={`size-16 rounded-3xl bg-gray-300`} />
      <Text className={`text-[12px] dark:text-gray-400 text-center`}>{props.name}</Text>
    </View>
  );
}
