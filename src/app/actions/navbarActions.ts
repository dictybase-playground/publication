import {
  FETCH_NAVBAR_REQUEST,
  FETCH_NAVBAR_SUCCESS,
  FETCH_NAVBAR_FAILURE,
} from "../../common/constants/types"
import navItems from "../../common/constants/navbar"
import { fetchFooter } from "./footerActions"

declare var process: {
  env: {
    REACT_APP_NAVBAR_JSON: string
  }
}

const navbarJson = process.env.REACT_APP_NAVBAR_JSON

const fetchNavbarRequest = () => ({
  type: FETCH_NAVBAR_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchNavbarSuccess = (json: Object) => ({
  type: FETCH_NAVBAR_SUCCESS,
  payload: {
    isFetching: false,
    links: json,
  },
})

const fetchNavbarFailure = (error: Object) => ({
  type: FETCH_NAVBAR_FAILURE,
  payload: {
    error,
  },
})

interface Item {
  attributes: {
    items: Array<Items>
    display: string
  }
}

interface Items {
  label: string
  link: string
}

export const fetchNavbarAndFooter = () => async dispatch => {
  try {
    dispatch(fetchNavbarRequest())
    const res = await fetch(navbarJson)
    const json = await res.json()
    if (res.ok) {
      const navbarArr = json.data.map((item: Item) => {
        const menuItemsArr = item.attributes.items.map(c => ({
          name: c.label,
          href: c.link,
        }))

        return {
          dropdown: true,
          title: item.attributes.display,
          items: menuItemsArr,
        }
      })

      dispatch(fetchNavbarSuccess(navbarArr))
      await dispatch(fetchFooter())
    } else {
      dispatch(fetchNavbarFailure(res.statusText))
      return navItems
    }
  } catch (error) {
    return dispatch(fetchNavbarFailure(error.toString()))
  }
}

export default fetchNavbarAndFooter
