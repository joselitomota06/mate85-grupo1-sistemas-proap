-- R__profiles_permissions.sql
-- Repeatable migration: seed roles (perfis), permissions and their relationships
-- Idempotent via INSERT ... ON CONFLICT DO NOTHING
-- Executes after all versioned migrations; safe to run multiple times.

--------------------------------------------------------------------------------------------------
-- 1. PERFIS (aut_perfil)
--------------------------------------------------------------------------------------------------
INSERT INTO proap.aut_perfil (id, name)
VALUES
    (1, 'Admin'),
    (2, 'Discente'),
    (3, 'Funcionario'),
    (4, 'Docente'),
    (5, 'Docente e Admin'),
    (6, 'CEAPG'),
    (7, 'Não atribuído')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

--------------------------------------------------------------------------------------------------
-- 2. PERMISSÕES (aut_permission)
--------------------------------------------------------------------------------------------------
INSERT INTO proap.aut_permission (id, key, description, enabled)
VALUES
    (1,  'APPROVE_REQUEST',      'Aprovar e revisar solicitação de assistência',       TRUE),
    (2,  'CREATE_REQUEST',       'Criar solicitação de assistência',                   TRUE),
    (3,  'VIEW_ALL_REQUESTS',    'Visualizar solicitações de todos os usuários',       TRUE),
    (4,  'EDIT_USER_ROLE',       'Alterar Perfil de outros usuários',                  TRUE),
    (5,  'REMOVE_USER',          'Remover usuários',                                   TRUE),
    (6,  'VIEW_USER',            'Visualizar dados de outros',                         TRUE),
    (7,  'DOCENTE_ROLE',         'Perfil possui privilégio de Docente',                TRUE),
    (8,  'ADMIN_ROLE',           'Perfil possui privilégio de Administrador',          TRUE),
    (9,  'CEAPG_ROLE',           'Perfil do CEAPG',                                    TRUE),
    (10, 'FUNCIONARIO_ROLE',     'Perfil de Funcionário',                              TRUE)
ON CONFLICT (id) DO UPDATE
    SET key = EXCLUDED.key,
        description = EXCLUDED.description,
        enabled = EXCLUDED.enabled;

--------------------------------------------------------------------------------------------------
-- 3. RELACIONAMENTO PERFIL <-> PERMISSÃO (aut_perfil_permission)
--------------------------------------------------------------------------------------------------
INSERT INTO proap.aut_perfil_permission (perfil_id, permission_id)
VALUES
    -- Admin
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 8),
    -- Funcionario
    (3, 1), (3, 3), (3, 6), (3, 10),
    -- Discente
    (2, 2),
    -- Docente e Admin
    (5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8),
    -- Docente
    (4, 1), (4, 2), (4, 3), (4, 6), (4, 7),
    -- CEAPG
    (6, 9), (6, 3), (6, 6)
ON CONFLICT DO NOTHING;

-- end of R__profiles_permissions.sql
