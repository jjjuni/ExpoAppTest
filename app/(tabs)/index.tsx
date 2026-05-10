import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import IonIcons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Profile } from '@/components/index/profile';
import { Friend } from '@/components/index/friend';
import { Birthdays, Favorites, Friends, UpdatedProfiles } from '@/constants/friends';

export default function HomeScreen() {

  return (
    <SafeAreaView className={`flex-1`} edges={['top']}>
      <ScrollView className={``}>
        <View className='px-4 flex flex-col gap-4'>
          <View className={`flex flex-row pt-4 `}>
            <View className={`flex flex-row grow gap-2 items-center`}>
              <View className={`aspect-square h-8 rounded-xl bg-gray-300`} />
              <Text className={`text-3xl font-bold dark:text-white`}>이준희</Text>
            </View>
            <View className={`flex flex-row-reverse grow gap-4`}>
              <Feather name="settings" size={24} className={`dark:text-white`} />
              <SimpleLineIcons name="present" size={24} className={`dark:text-white`} />
              <Feather name="user-plus" size={24} className={`dark:text-white`} />
              <IonIcons name="search" size={24} className={`dark:text-white`} />
            </View>
          </View>

          <View className={`w-full h-25 rounded-2xl bg-gray-400`} />

          <HomeSection label='업데이트 된 프로필'>
            <View className={`flex flex-row gap-5`}>
              {UpdatedProfiles.map(profile => (
                <Profile key={profile.id} name={profile.name} />
              ))}
            </View>
          </HomeSection>

          <HomeSection label='생일인 친구'>
            <View className={`flex flex-col gap-4`}>
              {Birthdays.map(birthday => (
                <Friend key={birthday.id} name={birthday.name} birthday={birthday.birthday} />
              ))}
            </View>
          </HomeSection>

          <HomeSection label='즐겨찾는 친구'>
            <View className={`flex flex-col gap-4`}>
              {Favorites.map(friend => (
                <Friend key={friend.id} name={friend.name} />
              ))}
            </View>
          </HomeSection>

          <HomeSection label='친구'>
            <View className={`flex flex-col gap-4`}>
              {Friends.map(friend => (
                <Friend key={friend.id} name={friend.name} />
              ))}
            </View>
          </HomeSection>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


function HomeSection({
  label,
  children,
}: { label: string, children: React.ReactNode }) {
  return (
    <View className={`flex flex-col gap-4 mb-5`}>
      <Text className={`text-[12px] dark:text-gray-400`}>{label}</Text>
      {children}
    </View>
  )
}