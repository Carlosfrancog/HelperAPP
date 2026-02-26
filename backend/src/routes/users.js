const express = require('express');
const db = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Obter perfil do usuário autenticado
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, email, avatar_url, bio, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// Atualizar perfil do usuário autenticado
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, avatar_url, bio } = req.body;

    const result = await db.query(
      'UPDATE users SET name = COALESCE($1, name), avatar_url = COALESCE($2, avatar_url), bio = COALESCE($3, bio) WHERE id = $4 RETURNING id, name, email, avatar_url, bio',
      [name, avatar_url, bio, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

module.exports = router;
