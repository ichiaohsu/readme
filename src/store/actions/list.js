
import * as listFunc from 'src/api/list'
import { get, } from 'lodash'
const debug = require('debug')('CLIENT:store:actions:list')
const FETCH_LIST = ({ commit, }, { params, endpoint, type }) => {
  debug('params', params)
  debug('endpoint', endpoint)
  return listFunc.fetchList({ params, endpoint, }).then(({ status, body, }) => {
    if (status === 200 && type === 'LITING_PAGE') {
      const count = get(body, 'meta.total')
      commit('SET_LIST', { items: get(body, 'items'), })
      count && commit('SET_LIST_ITEMS_COUNT', { count })
    }
    return { status, items: get(body, 'items'), }
  })
}
const FETCH_AUTOCOMPLETE_LIST = ({ commit, }, { params, endpoint, }) => {
  return listFunc.fetchList({ params, endpoint }).then(({ status, body, }) => {
    return { status, items: get(body, 'items'), }
  })
}
const FETCH_CHOICES = ({ commit, }, { id, params, endpoint, }) => {
  return listFunc.fetchChoices({ id, params, endpoint }).then(({ status, body, }) => {
    return { status, items: get(body, 'items'), }
  })
}

export {
  FETCH_CHOICES,
  FETCH_LIST,
  FETCH_AUTOCOMPLETE_LIST
}