-- Loops over each trial returning its ID and the ID of the following trial in
-- the DB. For example, if we have trials [A, B, C, D], this will return rows with
-- [[A, B], [B, C], [C, D]].

SELECT t1.id AS trial1_id,
       t2.id AS trial2_id
FROM
  (SELECT id
   FROM trials
   ORDER BY id) AS t1
-- Join with the trial in the following row
LEFT JOIN LATERAL
  (SELECT id
   FROM trials
   WHERE id > t1.id
   ORDER BY id LIMIT 1) AS t2 ON TRUE
-- Remove the last trial (which has no other trial to compare with)
WHERE t2.id IS NOT NULL;
