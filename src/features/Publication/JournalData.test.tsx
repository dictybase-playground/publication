import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import JournalData from "./JournalData"
import Grid from "@material-ui/core/Grid"

describe("Publication/JournalData", () => {
  const props = {
    data: {
      publication: {
        doi: "9.0909/j.diff.1964.02.01",
        full_text_url: "https://doi.org/9.0909/j.diff.1964.02.01",
        journal:
          "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        page: "71-79",
        publication_date: "1964-01-29",
        pubmed: "12345678",
        pubmed_url: "https://pubmed.gov/12345678",
      },
    },
  }
  const wrapper = shallow(<JournalData {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
    it("always renders two <div> elements", () => {
      expect(wrapper.dive().find("div")).toHaveLength(2)
    })
    it("always renders three <Grid> elements", () => {
      expect(wrapper.dive().find(Grid)).toHaveLength(3)
    })
    it("matches data prop value", () => {
      expect(wrapper.prop("data")).toEqual(props.data)
    })
  })
})