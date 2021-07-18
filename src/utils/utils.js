export const pageData = ({ data, per = 50, page = 1 }) => {
  return data.slice(per * (page - 1), per * page)
}
