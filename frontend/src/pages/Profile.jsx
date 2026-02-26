import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAvatarUrl(user.avatar_url || '');
      setBio(user.bio || '');
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateProfile({ name, avatar_url: avatarUrl, bio });
      setSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name || '');
    setAvatarUrl(user.avatar_url || '');
    setBio(user.bio || '');
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Meu Perfil</h1>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>

        <div className="profile-content">
          <div className="avatar-section">
            <div className="avatar">
              {(isEditing ? avatarUrl : user.avatar_url) ? (
                <img src={isEditing ? avatarUrl : user.avatar_url} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {(isEditing ? name : user.name)?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div className="form-group">
                <label>URL do Avatar</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://exemplo.com/avatar.jpg"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user.email} disabled />
                <small>O email não pode ser alterado</small>
              </div>

              {error && <div className="error">{error}</div>}
              {success && <div className="success">{success}</div>}

              <div className="button-group">
                <button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
                <button type="button" onClick={handleCancel} className="cancel-btn">
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <label>Nome</label>
                <p>{user.name}</p>
              </div>

              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              {user.bio && (
                <div className="info-item">
                  <label>Bio</label>
                  <p>{user.bio}</p>
                </div>
              )}

              {success && <div className="success">{success}</div>}

              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Editar Perfil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
