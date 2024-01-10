import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from "@expo/vector-icons"
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

const Page = () => {
  useWarmUpBrowser()

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={[defaultStyles.btn]}>
        <Text style={[defaultStyles.btnText]}>
          Continuer
        </Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View style={styles.seperatorLine} />
        <Text style={styles.seperator}>ou</Text>
        <View style={styles.seperatorLine} />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity onPress={() => { }} style={styles.btnOutline}>
          <Ionicons name='call-outline' size={20} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continuer avec le téléphone</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelectAuth(Strategy.Apple)} style={styles.btnOutline}>
          <Ionicons name='md-logo-apple' color="#A2AAAD" size={20} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continuer avec Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelectAuth(Strategy.Google)} style={styles.btnOutline}>
          <Ionicons name='md-logo-google' size={20} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continuer avec Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelectAuth(Strategy.Facebook)} style={styles.btnOutline}>
          <Ionicons name='md-logo-facebook' color='#316ff6' size={20} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continuer avec Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperatorLine: {
    flex: 1,
    borderBottomColor: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'mon-sb',
  },
})
export default Page