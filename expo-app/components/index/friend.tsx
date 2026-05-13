import { Text, View } from "react-native";

export function Friend(props: { name: string; birthday?: string }) {
  return (
    <View className={`flex flex-row gap-4 items-center w-full`}>
      <View className={`size-12 rounded-2xl bg-gray-300`} />
      <View className={`flex flex-col gap-1 items-start mr-auto`}>
        <Text className={`text-[16px] dark:text-gray-400 text-center`}>{props.name}</Text>
        {props.birthday && <Text className={`text-[12px] dark:text-gray-500 text-center`}>{props.birthday}</Text>}
      </View>
      {props.birthday &&
        <View className={`rounded-full border border-gray-300 py-2 px-3`}>
          <Text className={`dark:text-gray-300 text-[14px]`}>
            선물하기
          </Text>
        </View>
      }
    </View>
  );
}
