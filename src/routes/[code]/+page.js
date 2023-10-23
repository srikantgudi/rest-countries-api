import data from '../../data/data.json';

export function load({ params }) {
  return {
    row: data.filter(f => f.alpha3Code === params.code)[0]
  }
}