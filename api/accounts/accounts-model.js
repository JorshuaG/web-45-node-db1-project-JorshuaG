const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id }).first();
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  return getById(id);
};

const updateById = (id, changes) => {
  return db("accounts")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? getById(id) : null));
};

const deleteById = (id) => {
  return db("accounts").where({ id }).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
