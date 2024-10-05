import { useEffect, useState } from 'react';
import { router } from "expo-router";
import { Text } from 'react-native';
import Login from './Login';


/* export default function Index() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.push({
        //pathname: "./(tabs)/Home",
        pathname: "./Login",
      });
    }
  }, [isMounted]);

  return (
    <>
      <Text>Index</Text>
    </>
  );
} */

export default function Index() {
  return <Login/>;
}