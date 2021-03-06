import {
  FETCH_FOOTER_REQUEST,
  FETCH_FOOTER_SUCCESS,
  FETCH_FOOTER_FAILURE,
} from "../../common/constants/types"
import footerItems from "../../common/constants/footer"

declare var process: {
  env: {
    REACT_APP_FOOTER_JSON: string
  }
}

const footerJson = process.env.REACT_APP_FOOTER_JSON

const fetchFooterRequest = () => ({
  type: FETCH_FOOTER_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchFooterSuccess = (json: Object) => ({
  type: FETCH_FOOTER_SUCCESS,
  payload: {
    isFetching: false,
    links: json,
  },
})

const fetchFooterFailure = (error: Object) => ({
  type: FETCH_FOOTER_FAILURE,
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

// fetch footer function that fetches data using async/await
export const fetchFooter = () => async dispatch => {
  try {
    dispatch(fetchFooterRequest())
    const res = await fetch(footerJson)
    const json = await res.json()
    if (res.ok) {
      const footerArr = json.data.map((item: Item) => {
        const menuItemsArr = item.attributes.items.map(c => ({
          description: c.label,
          link: c.link,
        }))

        return [
          {
            header: {
              description: item.attributes.display,
            },
            items: menuItemsArr,
          },
        ]
      })

      return dispatch(fetchFooterSuccess(footerArr))
    }

    dispatch(fetchFooterFailure(res.statusText))
    return footerItems
  } catch (error) {
    return dispatch(fetchFooterFailure(error.toString()))
  }
}

export default fetchFooter
