import { Link, useRouter } from "expo-router";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import React from 'react';
import { auth } from "../firebase.config";

export default function Index() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter(); 



  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('Account created successfully');
    const user = userCredential.user;
    console.log('User:', user);

    router.push("/completeProfile"); 
  })
  .catch((error) => {
    console.error('Error creating account:', error.message);
    Alert.alert(error.message)
  });
}

  return (
    <View className="flex-1 items-center pt-16 bg-fondo">
      <Image
        source={require("../assets/images/LogoPits.png")}
        className="w-68 h-28 mb-8"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-center text-black mb-12">
        Create an account
      </Text>

      <TextInput
        onChangeText={(text) => setEmail(text)}
        placeholder="Email@domain.com"
        placeholderTextColor="#9CA3AF"
        className="w-10/12 bg-white text-black text-left px-4 py-3 rounded-xl my-6"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        className="w-10/12 bg-white text-black text-left px-4 py-3 rounded-xl"
      />

      <TouchableOpacity
        onPress={handleCreateAccount}
        className="bg-fondoNaranja w-10/12 py-3 rounded-xl mt-6 items-center"
      >
        <Text className="text-white text-base font-semibold">Create Account</Text>
      </TouchableOpacity>

      <View className="flex-row items-center w-11/12  my-9">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500 font-medium">or</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>


      <View className="w-10/12 mt-2 space-y-4">
        {/* Google */}
        <TouchableOpacity className="flex-row items-center bg-fondoGris  py-3 rounded-xl px-4 mb-4">
          <Image
            source={require("../assets/images/google-icon.png")}
            className="w-5 h-5 mr-3"
          />
          <Text className="text-black text-base font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity className="flex-row items-center bg-fondoGris py-3 rounded-xl px-4">
          <Image
            source={require("../assets/images/apple-icon.png")}
            className="w-5 h-5 mr-3"
          />
          <Text className="text-black text-base font-medium">
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>

      <View className="items-center w-10/12 mt-6 space-y-4">

       
        <Text className="text-center text-sm text-gray-600 mb-6">
          Already have an account?{" "}
          <Link href="/LogIn" className="text-blue-600 font-medium">Log in</Link>
        </Text>

  
        <Text className="text-center text-sm text-gray-500">
          By clicking Create Account, you agree to our{" "}
          <Text className="font-semibold text-black">Terms of Service</Text> and{" "}
          <Text className="font-semibold text-black">Privacy Policy</Text>.
        </Text>


      </View>

    </View>
  );
}