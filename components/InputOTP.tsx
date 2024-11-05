import { useRef } from 'react';
import {
  Alert,
  Keyboard,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface InputOTPProps {}

export const InputOTP = ({}: InputOTPProps) => {
  let codeOTP: Array<string> = ['', '', '', ''];
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChangeCode = (code: string, index: number) => {
    codeOTP[index] = code;
    // Verificar a existencia de 1 numero e pular para o proximo
    // até o final
    if (code.length == 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleBackspace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key == 'Backspace' && index > 0) {
      inputRefs[index - 1].current?.focus();
      codeOTP[index] = '';
    }
  };

  const handleValidateCode = () => {
    console.log('CÓDIGO DIGITADO: ', codeOTP);

    if (codeOTP.length == 4) {
      Alert.alert(
        'Código correto',
        'Parabéns, você está permitido entrar na sua conta'
      );
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 50,
          backgroundColor: '#222',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 22,
          }}
        >
          Confirme o Código
        </Text>
        <Text
          style={{
            color: '#999',
            fontSize: 13,
          }}
        >
          Enviamos um código de confirmação para seu E-mail
        </Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {inputRefs.map((input, index) => (
            <TextInput
              style={{
                width: 40,
                height: 50,
                borderWidth: 1,
                borderColor: '#eee',
                textAlign: 'center',
                fontSize: 20,
                marginHorizontal: 5,
                borderRadius: 6,
              }}
              key={index}
              ref={input}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={(text) => handleChangeCode(text, index)}
              onKeyPress={(e) => handleBackspace(e, index)}
            />
          ))}
        </View>
        <Pressable
          style={{
            width: '80%',
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#aaa',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}
          onPress={handleValidateCode}
        >
          <Text
            style={{
              color: '#eee',
              fontSize: 16,
            }}
          >
            Confirmar
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
