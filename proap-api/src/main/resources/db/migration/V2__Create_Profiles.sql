-- Criação da tabela aut_perfil (se ainda não existir)
CREATE TABLE IF NOT EXISTS proap.aut_perfil (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    enable BOOLEAN NOT NULL DEFAULT TRUE,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Inserção dos perfis pré-definidos
INSERT INTO proap.aut_perfil (name, enable, admin, created_at, updated_at)
VALUES 
    ('admin', TRUE, TRUE, NOW(), NOW()),
    ('user', TRUE, FALSE, NOW(), NOW());