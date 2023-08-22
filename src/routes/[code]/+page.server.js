import data from '../../data/data.json';

export async function load({params}) {
  const row = data.filter(f => f.alpha3Code === params.code);
  return {
    row: row[0]
  }
}