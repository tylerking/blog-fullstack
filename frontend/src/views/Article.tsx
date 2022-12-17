import { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import apiService from '../utils/apiService'
import Loading from '../components/Loading'
import TokenContext from '../context/tokenContext'
import UserContext from '../context/userContext'

import type { IArticle } from '../App.d.js'

const Article = () => {
  const params = useParams()
  const token = useContext(TokenContext)
  const user = useContext(UserContext)
  
  const [loading, setLoading] = useState<boolean>(true)
  const [image, setImage] = useState<string>('')
  const [article, setArticle] = useState<IArticle>({
    id: 0,
    author: '',
    desc: '',
    published: '',
    slug: '',
    title: '',
  })

  const deleteBtn = ()  => {
    apiService.DeleteArticle(article.slug, token)
      .then(() => {
        window.location.replace('/dashboard')
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    apiService.GetArticle(params.slug)
      .then(data => {
        console.log(data)
        setImage('https://picsum.photos/640/360')
        setArticle(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <article>
            <h3>{article.title}</h3>
            <p>Author: {article.author}</p>
            <img alt='Random Photo' src={image} />
            <p>{article.desc}</p>
            <p>Updated: {article.published}</p>

            {user?.username === article.author ? 
              <>
                <button onClick = {() => deleteBtn()}>Delete</button>
              </>
              : null
            }
          </article>
        </>
      )}
    </>
  )
}

export default Article