import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

import { IArticle } from '../App.d.js'
import apiService from '../utils/apiService'
import Loading from '../components/Loading'
import UserContext from '../context/userContext'

export interface ArticleListProps {
  articles: IArticle[],
}

type ArticleProps = {
  isUser: boolean
}

// eslint-disable-next-line react/prop-types
const Articles: React.FC<ArticleProps> = ({isUser}) => {
  const user = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [articles, setArticles] = useState<IArticle[]>([])

  const filterArticles = (data: IArticle[]) => {
    console.log(data)
    if (isUser) {
      const result = data.filter(article => article.author == user?.username)
      setArticles(result)
    } else {
      setArticles(data)
    }
  }

  useEffect(() => {
    apiService.GetArticles()
      .then(data => {
        filterArticles(data)
        setLoading(false)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {articles.map((article: IArticle, index) => {
              return <Grid key={index} xs={6}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='200'
                      image='https://picsum.photos/300/200'
                      alt='Random Photo'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {article.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {article.desc.slice(0, 100)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button href={`../article/${article.slug}`} size='small' color='primary'>Read</Button>
                  </CardActions>
                </Card>
              </Grid>
            })}
          </Grid>
        </Box>
      )}
    </>
  )
}

export default Articles