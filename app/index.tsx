import { useEffect, useState } from 'react';
import { router } from "expo-router";
import { Text } from 'react-native';

export default function Index() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.push({
        pathname: "./(tabs)/Home",
      });
    }
  }, [isMounted]);

  return (
    <>
      <Text>Index</Text>
    </>
  );
}