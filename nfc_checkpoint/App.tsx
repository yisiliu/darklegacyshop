import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { ethers } from "ethers";

const App = () => {
  const [nfcSupported, setNfcSupported] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const checkNfcSupport = async () => {
      const supported = await NfcManager.isSupported();
      setNfcSupported(supported);
      if (supported) {
        await NfcManager.start();
      }
    };
    checkNfcSupport();
    return () => NfcManager.stop();
  }, []);

  const readNfcTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      const ndefMessage = tag.ndefMessage;
      if (ndefMessage && ndefMessage.length > 0) {
        const payload = ndefMessage[0].payload;
        const textDecoder = new TextDecoder("utf-8");
        const url = textDecoder.decode(payload).slice(1); // Remove the 'en' language code
        const publicKey = extractPublicKey(url);
        const signature = signPublicKey(publicKey);
        setResult(`Public Key: ${publicKey}\nSignature: ${signature}`);
      } else {
        setResult("No NDEF message found on the tag");
      }
    } catch (ex) {
      setResult(`Error reading NFC tag: ${ex.message}`);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const extractPublicKey = (url) => {
    const params = new URLSearchParams(url.split("?")[1]);
    const pk1 = params.get("pk1");
    if (!pk1) {
      throw new Error("Public key not found in NFC tag data");
    }
    return `0x${pk1}`;
  };

  const signPublicKey = (publicKey) => {
    // This is a placeholder in-app private key. In a real app, this should be securely stored.
    const inAppPrivateKey =
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";
    const wallet = new ethers.Wallet(inAppPrivateKey);
    return wallet.signMessage(ethers.utils.arrayify(publicKey));
  };

  if (!nfcSupported) {
    return <Text>NFC not supported on this device</Text>;
  }

  return (
    <View>
      <Button title="Read NFC Tag" onPress={readNfcTag} />
      <Text>{result}</Text>
    </View>
  );
};

export default App;
