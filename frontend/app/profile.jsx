import { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AuthContext } from '../contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function Profile() {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAvatarUrl(user.avatar_url || '');
      setBio(user.bio || '');
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateProfile({ name, avatar_url: avatarUrl, bio });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setAvatarUrl(user?.avatar_url || '');
    setBio(user?.bio || '');
    setIsEditing(false);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  const displayAvatarUrl = isEditing ? avatarUrl : user.avatar_url;
  const displayName = isEditing ? name : user.name;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {displayAvatarUrl ? (
              <Image source={{ uri: displayAvatarUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {displayName?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.card}>
          {isEditing ? (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Seu nome"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>URL do Avatar</Text>
                <TextInput
                  style={styles.input}
                  value={avatarUrl}
                  onChangeText={setAvatarUrl}
                  placeholder="https://exemplo.com/avatar.jpg"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Conte um pouco sobre você..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  value={user.email}
                  editable={false}
                />
                <Text style={styles.helpText}>O email não pode ser alterado</Text>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary, loading && styles.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Salvar</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={handleCancel}
                >
                  <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nome</Text>
                <Text style={styles.infoValue}>{user.name}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>

              {user.bio && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Bio</Text>
                  <Text style={styles.infoValue}>{user.bio}</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 20,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  form: {
    gap: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e1e8ed',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  buttonGroup: {
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#667eea',
  },
  buttonSecondary: {
    backgroundColor: '#e1e8ed',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonTextSecondary: {
    color: '#333',
  },
  profileInfo: {
    gap: 20,
  },
  infoItem: {
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
