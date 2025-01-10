-- Criação da tabelas de perfis e permissões (se ainda não existir)
CREATE TABLE IF NOT EXISTS proap.aut_perfil (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS proap.aut_permission (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS proap.aut_perfil_permission (
    perfil_id INT REFERENCES proap.aut_perfil(id) ON DELETE CASCADE,
    permission_id INT REFERENCES proap.aut_permission(id) ON DELETE CASCADE,
    PRIMARY KEY (perfil_id, permission_id)
);

-- Inserção dos perfis pré-definidos
INSERT INTO proap.aut_perfil (name) VALUES 
    ('Admin'),
    ('Aluno'),
    ('Funcionario') 
ON CONFLICT (name) DO NOTHING;

-- Inserção das permissões pré-definidas
INSERT INTO proap.aut_permission (key, description, enabled) VALUES
    ('APPROVE_REQUEST', 'Aprovar e revisar solicitação de assistência', TRUE),
    ('CREATE_REQUEST', 'Criar solicitação de assistência', TRUE),
    ('VIEW_ALL_REQUESTS', 'Visualizar solicitações de todos os usuários', TRUE),
    ('EDIT_USER_ROLE', 'Alterar Perfil de outros usuários', TRUE),
    ('REMOVE_USER', 'Remover usuários', TRUE),
    ('VIEW_USER', 'Visualizar dados de outros', TRUE)
ON CONFLICT (key) DO NOTHING;

-- Associação de permissões aos perfis
INSERT INTO proap.aut_perfil_permission (perfil_id, permission_id)
VALUES
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Admin'), (SELECT id FROM proap.aut_permission WHERE key = 'APPROVE_REQUEST')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Admin'), (SELECT id FROM proap.aut_permission WHERE key = 'CREATE_REQUEST')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Admin'), (SELECT id FROM proap.aut_permission WHERE key = 'VIEW_ALL_REQUESTS')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Admin'), (SELECT id FROM proap.aut_permission WHERE key = 'EDIT_USER_ROLE')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Admin'), (SELECT id FROM proap.aut_permission WHERE key = 'REMOVE_USER')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Admin'), (SELECT id FROM proap.aut_permission WHERE key = 'VIEW_USER')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Funcionario'), (SELECT id FROM proap.aut_permission WHERE key = 'APPROVE_REQUEST')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Funcionario'), (SELECT id FROM proap.aut_permission WHERE key = 'VIEW_ALL_REQUESTS')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Funcionario'), (SELECT id FROM proap.aut_permission WHERE key = 'VIEW_USER')),
    ((SELECT id FROM proap.aut_perfil WHERE name = 'Aluno'), (SELECT id FROM proap.aut_permission WHERE key = 'CREATE_REQUEST'))
ON CONFLICT DO NOTHING;