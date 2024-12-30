interface Transaction {
  raw: (query: string) => Promise<{ id: number }[]>;
}

export const getLastInsertId = async (trx: Transaction): Promise<number> => {
  const result: { id: number }[] = await trx.raw('SELECT last_insert_rowid() AS id');
  const id: number | undefined = result[0]?.id;
  if (!id) {
    throw new Error('Failed to retrieve last inserted ID');
  }
  return id;
};
