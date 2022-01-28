import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Test from "../components/Test"
import Test2 from "../components/Test2"



const IndexPage = () => {

  var arr = [<Test />, <Test2 />]

  const random = Math.floor(Math.random() * arr.length)
  
  return (
    <Layout>
      <Seo title="dvdslns" />

      <div className="absolute inset-0 min-h-screen w-screen">
        {random, arr[random]}
      </div>
    </Layout>
  )
}
export default IndexPage
