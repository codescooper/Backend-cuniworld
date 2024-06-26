const addParentChildRelation = async (parent_id, child_id) => {
    try {
      const result = await db.query(
        "INSERT INTO parent_child (parent_id, child_id) VALUES ($1, $2) RETURNING *",
        [parent_id, child_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Erreur lors de l'ajout de la relation parent/enfant dans la base de données:", error);
      throw new Error("Erreur lors de l'ajout de la relation parent/enfant dans la base de données");
    }
  };
  
  const deleteParentChildRelation = async (id) => {
    try {
      const result = await db.query(
        "DELETE FROM parent_child WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Erreur lors de la suppression de la relation parent/enfant dans la base de données:", error);
      throw new Error("Erreur lors de la suppression de la relation parent/enfant dans la base de données");
    }
  };


  const getParentChildRelations = async () => {
    try {
      const result = await db.query(`
        SELECT pc.id, pc.parent_id, pc.child_id,
               rp.name AS parent_name, rc.name AS child_name
        FROM parent_child pc
        JOIN rabbit rp ON pc.parent_id = rp.id
        JOIN rabbit rc ON pc.child_id = rc.id
      `);
      return result.rows;
    } catch (error) {
      console.error("Erreur lors de la récupération des relations parent/enfant dans la base de données:", error);
      throw new Error("Erreur lors de la récupération des relations parent/enfant dans la base de données");
    }
  };
  