import React from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView, FlatList, Image } from 'react-native'
import { defaultStyles } from '@/constants/Styles';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';

const statusBarHeight = Constants.statusBarHeight;

interface Props {
  id: number;
  userName: string;
  dateCreation: string;
  msg: string;
  profilPicture: string;
  timestamp: number;
}

const Page = () => {

  const { user } = useUser()

  if (!user) {
    return null;
  }

  const messagesData: Props[] = [
    {
      id: 1,
      userName: 'Service client',
      dateCreation: '01/01/2024',
      msg: "Bonjour, je suis le service support de RoamRental. En quoi puis-je vous aider ?",
      profilPicture: "https://firebasestorage.googleapis.com/v0/b/roamrental.appspot.com/o/business-customer-service.jpg?alt=media&token=427c56ca-4650-4bb4-ad0c-6dc9a269b8a1",
      timestamp: 1704104369
    },
    {
      id: 2,
      userName: user.fullName!,
      dateCreation: '01/01/2024',
      msg: "Bonjour, j'ai réservé une location et j'aimerais demander un remboursement.",
      profilPicture: user.imageUrl || '', // Assurez-vous que user.imageUrl ne soit pas null ou undefined
      timestamp: 1704104384
    },
    {
      id: 3,
      userName: 'Service client',
      dateCreation: '01/01/2024',
      msg: "Bien sûr, je vais vous aider avec votre demande de remboursement. Pouvez-vous me fournir plus de détails sur votre réservation ?",
      profilPicture: "https://firebasestorage.googleapis.com/v0/b/roamrental.appspot.com/o/business-customer-service.jpg?alt=media&token=427c56ca-4650-4bb4-ad0c-6dc9a269b8a1",
      timestamp: 1704104401
    },
    {
      id: 4,
      userName: user.fullName!,
      dateCreation: '01/01/2024',
      msg: "J'ai réservé un appartement à Paris pour les dates du 15/02/2024 au 20/02/2024. Malheureusement, j'ai dû annuler ma réservation en raison d'une urgence personnelle.",
      profilPicture: user.imageUrl || '', // Assurez-vous que user.imageUrl ne soit pas null ou undefined
      timestamp: 1704104455
    },
    {
      id: 5,
      userName: 'Service client',
      dateCreation: '01/01/2024',
      msg: "Je comprends la situation. Nous allons examiner votre demande de remboursement et vous fournir une réponse dès que possible.",
      profilPicture: "https://firebasestorage.googleapis.com/v0/b/roamrental.appspot.com/o/business-customer-service.jpg?alt=media&token=427c56ca-4650-4bb4-ad0c-6dc9a269b8a1",
      timestamp: 1704104520
    },
    {
      id: 6,
      userName: user.fullName!,
      dateCreation: '01/01/2024',
      msg: "Merci beaucoup pour votre aide. J'apprécie vraiment cela.",
      profilPicture: user.imageUrl || '', // Assurez-vous que user.imageUrl ne soit pas null ou undefined
      timestamp: 1704104568
    },
    {
      id: 7,
      userName: 'Service client',
      dateCreation: '01/01/2024',
      msg: "De rien ! Votre demande a été enregistrée et nous la traiterons dans les plus brefs délais. Vous recevrez également un e-mail avec les détails du remboursement une fois qu'il sera approuvé.",
      profilPicture: "https://firebasestorage.googleapis.com/v0/b/roamrental.appspot.com/o/business-customer-service.jpg?alt=media&token=427c56ca-4650-4bb4-ad0c-6dc9a269b8a1",
      timestamp: 1704104678
    },
  ];

  // Tri des messages par ordre décroissant de timestamp (du plus récent au plus ancien)
  const sortedMessages = messagesData.sort((a, b) => b.timestamp - a.timestamp);

  // ...

  const renderMessageItem = ({ item }: { item: Props }) => {
    // Créer un objet Date à partir du timestamp
    const date = new Date(item.timestamp * 1000); // Multipliez par 1000 car le timestamp est en secondes

    // Obtenir l'heure et les minutes au format HH:mm
    const heure = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Concaténer l'heure et les minutes
    const heureFormattee = `${heure}:${minutes}`;

    return (
      <View style={styles.messageItem}>
        <Image source={{ uri: item.profilPicture }} style={styles.profileImage} onError={(e) => e.preventDefault()} />
        <View style={styles.messageContent}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.messageText}>{item.msg}</Text>
          <Text style={styles.timestamp}>Le {item.dateCreation} à {heureFormattee}</Text>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? [defaultStyles.container, { marginTop: statusBarHeight }]
          : defaultStyles.container
      }
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Messagerie</Text>
        <Ionicons name="mail-outline" size={26} />
      </View>

      <FlatList
        data={sortedMessages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessageItem}
      />

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 5
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: "#00468c",
    textAlign:"right"
  },
});

export default Page;
