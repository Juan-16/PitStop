import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase.config";


export default function Index() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const router = useRouter();

  const validarCampos = () => {
    let valido = true;
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("El correo es obligatorio.");
      valido = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Correo inválido.");
      valido = false;
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria.");
      valido = false;
    } else if (password.length < 6) {
      setPasswordError("Mínimo 6 caracteres.");
      valido = false;
    } else if (password.length > 20) {
      setPasswordError("Máximo 20 caracteres.");
      valido = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Debe contener al menos una letra mayúscula.");
      valido = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Debe contener al menos un carácter especial.");
      valido = false;
    } else {
      setPasswordError(""); // Limpia error si es válida
    }

    return valido;
  };

  const handleCreateAccount = () => {
    if (!validarCampos()) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        console.log('Account created successfully');
        router.push("/completeProfile");
      })
      .catch((error) => {
        console.error('Error creating account:', error.message);
        Alert.alert("Error", error.message);
      });
  };

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
        className={`w-10/12 bg-white text-black text-left px-4 py-3 rounded-xl my-2 ${emailError ? 'border border-red-500' : ''}`}
        value={email}
      />
      {emailError ? <Text className="text-red-500 text-sm w-10/12">{emailError}</Text> : null}

      <View className="w-10/12 relative">
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          className={`bg-white text-black text-left px-4 py-3 rounded-xl my-2 pr-10 ${passwordError ? "border border-red-500" : ""
            }`}
          value={password}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-6"
        >
          <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#6B7280" />
        </TouchableOpacity>
        {passwordError ? (
          <Text className="text-red-500 text-sm mt-1">{passwordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={handleCreateAccount}
        className="bg-fondoNaranja w-10/12 py-3 rounded-xl mt-4 items-center"
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
          <Link href="/completeProfile" className="text-blue-600 font-medium">Log in</Link>
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



