import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();

const HomePageScreen = ({navigation, connections, setConnections, saveConnection  }) => {
  const [editedConnection, setEditedConnection] = useState(null);

  const handleEditPress = (connectionName) => {
    console.log('Edit pressed:', connectionName);
    const editedConnection = connections.find(
      (connection) => connection.connectionName === connectionName
    );

    navigation.navigate('ConfigConnect', {
      saveConnection,
      editedConnection,
    });
  };

  const saveConnectionHandler = async (newConnection) => {
    try {
      const updatedConnections = editedConnection
        ? connections.map((connection) =>
            connection.connectionName === editedConnection.connectionName ? newConnection : connection
          )
        : [...connections, newConnection];

      setConnections(updatedConnections);
      await AsyncStorage.setItem('connections', JSON.stringify(updatedConnections));
    } catch (error) {
      console.error('Error saving connection:', error);
    }
  };

  const handleDeletePress = async (connectionName) => {
    // Handle delete press
    console.log('Delete pressed:', connectionName);

    try {
      // Filter out the connection to be deleted
      const updatedConnections = connections.filter(
        (connection) => connection.connectionName !== connectionName
      );

      // Update the connections state
      setConnections(updatedConnections);

      // Save the updated connections to AsyncStorage
      await AsyncStorage.setItem('connections', JSON.stringify(updatedConnections));
    } catch (error) {
      console.error('Error deleting connection:', error);
    }
  };

  useEffect(() => {
    const updateConnections = async () => {
      try {
        // Save updated connections to AsyncStorage
        await AsyncStorage.setItem('connections', JSON.stringify(connections));
      } catch (error) {
        console.error('Error updating connections:', error);
      }
    };

    // Call the function to save connections when there is a change
    updateConnections();
  }, [connections]);

  return (
    <View style={styles.container}>
    {connections.length === 0 ? (
     <View style={styles.cityButtonsContainer}>
     <View style={styles.gridContainer}>
       <TouchableOpacity
         style={[styles.cityButton, styles.greenBackground, styles.gridItem, styles.centeredButton]}
         onPress={() => navigation.navigate('LivingRoom', { city: 'Living Room' })}
       >
         <Text style={styles.cityButtonText}>Living Room</Text>
         <Ionicons name="ios-bed" size={24} color="#fff" />
       </TouchableOpacity>
   
       <TouchableOpacity
         style={[styles.cityButton, styles.greenBackground, styles.gridItem, styles.centeredButton]}
         onPress={() => navigation.navigate('LivingRoom', { city: 'Bedroom' })}
       >
         <Text style={styles.cityButtonText}>Bedroom</Text>
         <Ionicons name="ios-bed" size={24} color="#fff" />
       </TouchableOpacity>
     </View>
   
     <View style={styles.gridContainer}>
     <TouchableOpacity
       style={[styles.cityButton, styles.greenBackground, styles.gridItem, styles.centeredButton]}
      onPress={() => navigation.navigate('LivingRoom', { city: 'Bathroom' })}
     >
     <Text style={styles.cityButtonText}>Bathroom</Text>
     <Ionicons name="ios-water" size={24} color="#fff" />
     </TouchableOpacity>
   
       <TouchableOpacity
         style={[styles.cityButton, styles.greenBackground, styles.gridItem, styles.centeredButton]}
         onPress={() => navigation.navigate('LivingRoom', { city: 'Garage' })}
       >
         <Text style={styles.cityButtonText}>Garage</Text>
         <Ionicons name="ios-car" size={24} color="#fff" />
       </TouchableOpacity>
     </View>
    </View>
    ) : (
      <FlatList
          data={connections}
          keyExtractor={(item) => item.connectionName.toString()}
          renderItem={({ item }) => (
            <View style={styles.connectionItem}>
              <TouchableOpacity
                style={styles.connectionButton}
                onPress={() => {
                  // Handle connection press
                  console.log('Connection pressed:', item.connectionName);
                  navigation.navigate('DashboardScreen');
                }}
              >
                <Text>{item.connectionName}</Text>
              </TouchableOpacity>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => handleEditPress(item.connectionName)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeletePress(item.connectionName)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                {/* ... (code above) */}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const HistoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>HistoryScreen</Text>
  </View>
);
  
const HomeScreen = ({ navigation, route }) => {
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    // Load connections from AsyncStorage
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const storedConnections = await AsyncStorage.getItem('connections');
      if (storedConnections) {
        setConnections(JSON.parse(storedConnections));
      }
    } catch (error) {
      console.error('Error loading connections:', error);
    }
  };

  const saveConnection = async (newConnection) => {
    try {
      const updatedConnections = [...connections, newConnection];
      setConnections(updatedConnections);
      await AsyncStorage.setItem('connections', JSON.stringify(updatedConnections));
    } catch (error) {
      console.error('Error saving connection:', error);
    }
  };

  const handleAddPress = () => {
    const { editedConnection } = route.params || {};

    navigation.navigate('ConfigConnect', {
      saveConnection,
      editedConnection,
    });
  };

  const toggleMenuModal = () => {
    setMenuModalVisible(!isMenuModalVisible);
  };

  const handleAllConnectionsPress = () => {
    // Handle the press of "All Connections" button
    console.log('All Connections Pressed');
    toggleMenuModal(); // Close the modal after handling the press
  };

  const handleLogoutPress = async () => {
    // Handle the press of "Logout" button
    try {
      // Hapus data pengguna yang disimpan di AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Navigasi ke halaman login
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
     <Tab.Navigator style={styles.TabNavigator}>
     <Tab.Screen name="Home Page">
  {() => (
    <HomePageScreen
      navigation={navigation}
      connections={connections}
      setConnections={setConnections}
      saveConnection={saveConnection} // Pass saveConnection here
    />
  )}
</Tab.Screen>
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>

    <TouchableOpacity style={styles.MenuButton} onPress={toggleMenuModal}>
      <Text style={styles.buttonText}>Menu</Text>
    </TouchableOpacity>

    {/* Popup Menu Modal */}
    <Modal visible={isMenuModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalItem} onPress={handleAllConnectionsPress}>
            <Text style={styles.buttonText}>All Connections</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={handleAllConnectionsPress}>
            <Text style={styles.buttonText}>App Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={handleLogoutPress}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          {/* Add more menu items as needed */}
          {/* ... */}

          {/* Close Modal Button */}
          <TouchableOpacity style={styles.modalItem} onPress={toggleMenuModal}>
            {/* Replace the "Close Menu" text with the FontAwesome icon */}
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleHome: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 30,
    marginLeft: 30,
    textAlign: 'center',
  },
  centeredButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Modify the existing styles
  cityButton: {
    borderRadius: 10,
    padding: 15,
    width: 150,
    height: 150,
    margin: 10,
  },
  greenBackground: {
    backgroundColor: '#71C490',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#71C490',
    borderRadius: 30,
    padding: 15,
  },
  TabNavigator: {
    backgroundColor: '#71C490',
  },
  MenuButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: '#71C490',
    borderRadius: 30,
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalItem: {
    backgroundColor: '#71C490',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  setupConnectionButton: {
    backgroundColor: '#71C490',
    borderRadius: 30,
    padding: 15,
    marginTop: 20,
  },
  connectionButton: {
  backgroundColor: '#71C490',
  borderRadius: 5,
  padding: 10,
  marginVertical: 5,
  alignItems: 'center',
  },
});

export default HomeScreen;