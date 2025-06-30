-- Remove a coluna afastamento_para_participacao
ALTER TABLE proap.proap_assistancerequest 
DROP COLUMN IF EXISTS afastamento_para_participacao;

-- Renomeia a coluna dias_afastamento para qtd_dias_evento
ALTER TABLE proap.proap_assistancerequest 
RENAME COLUMN dias_afastamento TO qtd_dias_evento;