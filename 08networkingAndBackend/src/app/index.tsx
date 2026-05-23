import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface User {
  id?: number;
  name: string;
  email: string;
}

export default function Index() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  const fetchUserByID = async () => {
    if (!userId.trim()) {
      Alert.alert("Error", "Please enter an ID");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId.trim())}`);
      const data = await res.json();

      if (res.ok && data) {
        setFetchedUser(data);
      } else {
        setFetchedUser(null);
        Alert.alert("Error", data?.error || "User not found");
      }
    } catch (error) {
      setFetchedUser(null);
      Alert.alert("Error", "Failed to fetch user");
      console.log("Error fetching user by ID: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "User added successfully!");
        setName("");
        setEmail("");
        fetchUsers();
      } else {
        Alert.alert("Error", data.error || "Failed to add user");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add user");
      console.log("Error adding user: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add User</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAddUser}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Adding..." : "Add User"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Fetch User by ID</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter user ID"
          placeholderTextColor="#999"
          value={userId}
          onChangeText={setUserId}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={fetchUserByID}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Searching..." : "Fetch User"}
          </Text>
        </TouchableOpacity>

        {fetchedUser ? (
          <View style={[styles.userCard, styles.resultCard]}>
            <Text style={styles.userName}>{fetchedUser.name}</Text>
            <Text style={styles.userEmail}>{fetchedUser.email}</Text>
            <Text style={styles.userId}>ID: {fetchedUser.id}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.usersContainer}>
        <Text style={styles.subtitle}>Users List</Text>
        {users.length === 0 ? (
          <Text style={styles.emptyText}>No users yet</Text>
        ) : (
          users.map((user, index) => (
            <View key={index} style={styles.userCard}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  usersContainer: {
    padding: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  userId: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
    fontWeight: "600",
  },
  resultCard: {
    borderLeftColor: "#34C759",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});
