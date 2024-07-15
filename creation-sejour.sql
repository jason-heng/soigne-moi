BEGIN TRANSACTION;

-- Créer le séjour sans l'id de la prescription
INSERT INTO Stay (patientId, start, end, doctorId, reason)
VALUES (1, 10, 20, 2, 'Transaction');

-- Recuperer le dernier séjour crée et le stocker dans une table temporaire car sqlite ne supporte pas le mot clé RETURNING
CREATE TEMP TABLE TempStayId (id INTEGER);
INSERT INTO TempStayId (id)
VALUES (last_insert_rowid());

-- Créer la préscription du séjour
INSERT INTO Prescription (stayId, start, end)
VALUES ((SELECT id FROM TempStayId), 10, 30);

-- Recuperer la derniere préscription créee et la stocker dans une table temporaire pour la meme raison
CREATE TEMP TABLE TempPrescriptionId (id INTEGER);
INSERT INTO TempPrescriptionId (id)
VALUES (last_insert_rowid());

-- Mettre a jour le séjour avec l'id de la préscription
UPDATE Stay
SET prescriptionId = (SELECT id FROM TempPrescriptionId)
WHERE id = (SELECT id FROM TempStayId);

-- Supprimer les tables temporaires
DROP TABLE TempStayId;
DROP TABLE TempPrescriptionId;

COMMIT;