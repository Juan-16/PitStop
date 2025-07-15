import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import MapPicker from '../components/MapPicker';
import * as Location from "expo-location";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];



export default function completeProfile() {


    // Imagen de logo taller
    const [logo, setLogo] = useState<string | null>(null);

    const pickImage = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Se necesita permiso para acceder a la galería.');
            return;
        }

        // Abre la galería
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // cuadrado
            quality: 1,
        });

        if (!result.canceled) {
            setLogo(result.assets[0].uri);
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [horarios, setHorarios] = useState(
        diasSemana.map(() => ({
            activo: true,
            inicio: "",
            fin: ""
        }))
    );

    const toggleDia = (index: number) => {
        const nuevosHorarios = [...horarios];
        nuevosHorarios[index].activo = !nuevosHorarios[index].activo;

        // Limpia los campos si se desactiva
        if (!nuevosHorarios[index].activo) {
            nuevosHorarios[index].inicio = "";
            nuevosHorarios[index].fin = "";
        }

        setHorarios(nuevosHorarios);
    };

    const handleHorarioChange = (
        index: number,
        campo: "inicio" | "fin",
        valor: string
    ) => {
        const nuevosHorarios = [...horarios];
        nuevosHorarios[index][campo] = valor;
        setHorarios(nuevosHorarios);
    };


    const [direccion, setDireccion] = useState<string>("");
    const [mostrarMapa, setMostrarMapa] = useState(false);
    const handleDireccionSeleccionada = (ubicacion: {
        latitude: number;
        longitude: number;
        direccion: string;
    }) => {
        setDireccion(ubicacion.direccion);
        // Aquí puedes guardar lat/long si lo necesitas también
    };

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.warn("Permiso denegado para acceder a la ubicación");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const [place] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (place) {
                const sugerencia = `${place.street ?? ""} ${place.name ?? ""}, ${place.city ?? ""}, ${place.region ?? ""}`;
                setDireccion(sugerencia); // Esto llena el input automáticamente
            }
        })();
    }, []);




    const [tipoSeleccionado, setTipoSeleccionado] = useState<"taller" | "persona">("persona");

    return (

        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, position: 'relative' }}
        >
            {<View className="w-full items-center my-6">

                <Text className="text-2xl font-bold text-center text-black mb-6">
                    ¿Cómo desea usar la app?
                </Text>
                {/* Selector */}
                <View className="flex-row justify-center mb-6">



                    <TouchableOpacity
                        onPress={() => setTipoSeleccionado("persona")}
                        className={`min-w-[120px] py-3 rounded-xl mx-2 items-center ${tipoSeleccionado === "persona"
                            ? "bg-fondoNaranja"
                            : "bg-transparent border border-fondoNaranja"
                            }`}
                    >
                        <Text
                            className={`font-semibold ${tipoSeleccionado === "persona" ? "text-white" : "text-[#FF6D08]"
                                }`}
                        >
                            Persona
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setTipoSeleccionado("taller")}
                        className={`min-w-[120px] py-3 rounded-xl mx-2 items-center ${tipoSeleccionado === "taller"
                            ? "bg-fondoNaranja"
                            : "bg-transparent border border-fondoNaranja"
                            }`}
                    >
                        <Text
                            className={`font-semibold ${tipoSeleccionado === "taller" ? "text-white" : "text-[#FF6D08]"
                                }`}
                        >
                            Taller
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Contenido según selección */}
                <View className="w-11/12">
                    {tipoSeleccionado === "persona" ? (
                        <Text className="text-center">Formulario para Persona</Text>
                    ) : (
                        <View className="items-center my-6" >
                            <TouchableOpacity
                                className="w-40 h-40 rounded-full bg-gray-200 items-center justify-center overflow-hidden"
                                onPress={pickImage}
                            >
                                <Image
                                    source={
                                        logo
                                            ? { uri: logo }
                                            : require('../assets/images/defaultLogo.png')
                                    }
                                    style={{
                                        width: '128%',
                                        height: '128%',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </TouchableOpacity>

                            <Text className="mt-2 text-sm text-gray-500 font-medium">Upload logo</Text>

                            <View className="items-center w-full px-4 mt-4">
                                <TextInput
                                    placeholder="Nombre del taller"
                                    placeholderTextColor="#9CA3AF"
                                    className="w-10/12 bg-white text-black text-left px-4 py-3 rounded-xl my-3"
                                />

                                <TextInput
                                    placeholder="Teléfono"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="phone-pad"
                                    className="w-10/12 bg-white text-black text-left px-4 py-3 rounded-xl my-3"
                                />
                            </View>

                            <View className="items-center my-4">
                                <TouchableOpacity
                                    onPress={() => setModalVisible(true)}
                                    className="bg-[#434343] py-3 px-6 rounded-xl"
                                >
                                    <Text className="text-white font-semibold">Seleccionar horarios de atención</Text>
                                </TouchableOpacity>

                                <Modal
                                    isVisible={modalVisible}
                                    onBackdropPress={() => setModalVisible(false)}
                                    style={{ justifyContent: 'flex-end', margin: 0 }}
                                >
                                    <View className="bg-white p-4 rounded-t-2xl max-h-[60%]">
                                        <Text className="text-lg font-bold mb-4 text-center">Horarios de Atención</Text>

                                        <ScrollView className="max-h-[420px]">
                                            {diasSemana.map((dia, index) => (
                                                <View key={dia} className="flex-row items-center justify-between mb-4">

                                                    <TouchableOpacity onPress={() => toggleDia(index)}>
                                                        <Text
                                                            className={`w-24 text-base font-medium ${horarios[index].activo ? "text-black" : "text-gray-400 line-through"
                                                                }`}
                                                        >
                                                            {dia}
                                                        </Text>
                                                    </TouchableOpacity>


                                                    {horarios[index].activo ? (
                                                        <View className="flex-row">
                                                            <TextInput
                                                                placeholder="Desde H:M"
                                                                placeholderTextColor="#9CA3AF"
                                                                className="border px-3 py-2 rounded-md w-28 mr-2"
                                                                value={horarios[index].inicio}
                                                                onChangeText={(text) =>
                                                                    handleHorarioChange(index, "inicio", text)
                                                                }
                                                            />
                                                            <TextInput
                                                                placeholder="Hasta H:M"
                                                                placeholderTextColor="#9CA3AF"
                                                                className="border px-3 py-2 rounded-md w-28"
                                                                value={horarios[index].fin}
                                                                onChangeText={(text) => handleHorarioChange(index, "fin", text)}
                                                            />
                                                        </View>
                                                    ) : (

                                                        <View className="flex-row">
                                                            <View className="w-28 mr-2" />
                                                            <View className="w-28" />
                                                        </View>
                                                    )}
                                                </View>
                                            ))}
                                        </ScrollView>

                                        <TouchableOpacity
                                            onPress={() => setModalVisible(false)}
                                            className="mt-4 bg-[#FF6D08] py-2 rounded-xl items-center"
                                        >
                                            <Text className="text-white font-medium">Guardar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>

                            <View>

                                <TouchableOpacity
                                    onPress={() => setMostrarMapa(true)}
                                    className="bg-[#434343] py-3 px-6 rounded-xl mb-4"
                                >
                                    <Text className="text-white font-semibold text-center">Seleccionar dirección</Text>
                                </TouchableOpacity>

                                {/* Componente MapPicker */}
                                {mostrarMapa && (
                                    <MapPicker
                                        visible={true}
                                        onClose={() => setMostrarMapa(false)}
                                        onLocationSelected={handleDireccionSeleccionada}
                                    />
                                )}
                            </View>

                            <View className="w-full items-center mb-6">
                                <Text className="mb-2 font-semibold text-base">O escribe tu dirección manualmente</Text>
                                <TextInput
                                    className="border w-11/12 rounded-xl px-4 py-3"
                                    placeholder="Ej: Calle 123 #45-67, Bogotá"
                                    value={direccion}
                                    onChangeText={setDireccion}
                                />
                            </View>
                            <TouchableOpacity
                                className="bg-fondoNaranja w-6/12 py-3 rounded-xl mt-2 items-center"
                            >
                                <Text className="text-white text-base font-semibold">Continue</Text>
                            </TouchableOpacity>






                        </View>
                    )}
                </View>
                <View className="items-start w-11/12  space-y-4">
                    <Image
                        source={require('../assets/images/LogoCarro.png')}
                        className="w-24 h-16 absolute"
                        resizeMode="contain"
                    />
                </View>

            </View>}
        </KeyboardAwareScrollView>

    );
}